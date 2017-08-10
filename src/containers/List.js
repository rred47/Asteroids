import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'

import API from '../api'

import ListOfAsteroids from '../components/ListOfAsteroids'
import Filter from '../components/Filter'
import AsteroidsPagination from '../components/AsteroidsPagination'

export default class List extends Component {
  constructor(props) {
    super(props)

    document.title = 'Главная страница'

    this.api = new API()
    this.loadListOfAsteroid = this.loadListOfAsteroid.bind(this)
    this.loadPereodList = this.loadPereodList.bind(this)
    this.filterList = this.filterList.bind(this)
    this.veritifyRequest = this.veritifyRequest.bind(this, this.api.xhr)
    this.showList = this.showList.bind(this)
    this.api.xhr.onload = this.veritifyRequest

    this.state = {
      page: this.api.page,
      size: this.api.size,
      status: 'loading'
    }
  }

  loadListOfAsteroid(page, size) {
    this.api.getListOfAsteroids(page, size)

    this.setState({
      page: page,
      size: size
    })
  }

  loadPereodList(beginDate, endDate) {
    if(beginDate === undefined) {
      this.api.getTodayList()
    } else {
      this.api.getPereodList(beginDate, endDate)
    }

    this.setState({
      status: 'loadingFilter'
    })
  }



  filterList(value) {
    let status = ''
    if(value.name === '' && value.id === '' && value.danger === '') {
      status = 'ok'
    } else {
      status = 'filterLoaded'
    }

    let filterAsteroids = this.state.asteroids.filter(asteroid =>
    (asteroid.name.toLowerCase().indexOf(value.name.toLowerCase()) !== -1 &&  asteroid.neo_reference_id.indexOf(value.id) !== -1 &&  (asteroid.is_potentially_hazardous_asteroid === value.danger || value.danger === '')))
    this.setState({
      filterAsteroids: filterAsteroids,
      status: status
    })
  }

  showList() {
    this.loadListOfAsteroid(this.state.page, this.state.size)
  }


  veritifyRequest(xhr) {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText)
      let asteroids = data.near_earth_objects
      let status = 'ok'
      let totalPages = 0

      if(this.state.status === 'loadingFilter') {
        for (let date in data.near_earth_objects) {
          if (data.near_earth_objects.hasOwnProperty(date)) {
            asteroids = data.near_earth_objects[date]
          }
        }

        status = 'filterLoaded'
      } else {
        totalPages = data.page.total_pages + 1
      }

      this.setState({
        total_pages: totalPages,
        asteroids: asteroids,
        filterAsteroids: asteroids,
        status: status
      })

    } else {
      this.setState({
        status: 'error'
      })
    }
  }


  componentDidMount() {
    this.loadListOfAsteroid(this.state.page, this.state.size)
  }


  render() {
    const status = this.state.status
    let needPagination = status !== 'filterLoaded'

    const filter = <Filter
      loadPereodList={this.loadPereodList}
      filterList={this.filterList}
      status={this.state.status}
      showList={this.showList}
    />

    let list = <ListOfAsteroids
      asteroids={this.state.asteroids}
      page={this.state.page}
      size={this.state.size}
      needPagination={needPagination}
    />

    let filterList = <ListOfAsteroids
      asteroids={this.state.filterAsteroids}
      page={this.state.page}
      size={this.state.size}
      needPagination={needPagination}
    />

    const pagination = <AsteroidsPagination
      items={this.state.total_pages}
      loadListOfAsteroid={this.loadListOfAsteroid}
      size={this.state.size}
      page={this.state.page}
    />

    const body = <div>
      {filter}
      {list}
      {pagination}
    </div>

    const filterBody = <div>
      {filter}
      {filterList}
    </div>

    const loadingBody = 'Загрузка...'
    const errorBody = 'Ошибка загрузки данных со сервера!'

    let panelHeaderText = 'Ошибка'
    let panelStyle = 'danger'
    let panelBody = errorBody

    switch (status) {
      case 'ok':
        panelHeaderText = 'Главная'
        panelStyle = 'primary'
        panelBody = body
        break

      case 'loading':
        panelHeaderText = 'Главная'
        panelStyle = 'primary'
        panelBody = loadingBody
        break

      case 'filterLoaded':
        panelHeaderText = 'Главная'
        panelStyle = 'primary'
        panelBody = filterBody
        break

      case 'loadingFilter':
        panelHeaderText = 'Главная'
        panelStyle = 'primary'
        panelBody = loadingBody
        break

      case 'error':
        panelHeaderText = 'Ошибка'
        panelStyle = 'danger'
        panelBody = errorBody
        break

      default:
        panelHeaderText = 'Ошибка'
        panelStyle = 'danger'
        panelBody = errorBody
    }

    const panelHeader = <h1>{panelHeaderText}</h1>

    return (
      <div className={'container'}>
        <Panel header={panelHeader} bsStyle={panelStyle}>
          {panelBody}
          </Panel>
      </div>
    )
  }
}
