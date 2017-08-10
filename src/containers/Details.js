import React, { Component } from 'react'
import { Panel, Pager } from 'react-bootstrap'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import API from '../api'

import ListOfApproaches from '../components/ListOfApproaches'
import AsteroidDescription from '../components/AsteroidDescription'


export default class Details extends Component {
  constructor(props) {
    super(props)

    this.api = new API()
    this.loadAsteroid = this.loadAsteroid.bind(this)
    this.veritifyRequest = this.veritifyRequest.bind(this, this.api.xhr)
    this.api.xhr.onload = this.veritifyRequest

    document.title = `Астероид ${props.match.params.asteroid_id}`

    this.state = {
      id: props.match.params.asteroid_id,
      status: 'loading'
    }
  }

  loadAsteroid(id) {
    this.api.getAsteroid(id)
  }


  veritifyRequest(xhr) {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText)

      this.setState({
        asteroid: data,
        name: data.name,
        approaches: data.close_approach_data,
        status: 'ok'
      })
    } else {
      sessionStorage.setItem('id', this.state.id )
      this.setState({
        status: 'error'
      })
    }
  }


  componentDidMount() {
    this.loadAsteroid(this.state.id)
  }


  render() {
    const list = <ListOfApproaches
      fill
      approaches={this.state.approaches}
    />

    const description = <AsteroidDescription
      asteroid={this.state.asteroid}
    />

    const pager = <Pager>
      <Pager.Item previous>
        <Link to='/#' activeClassName='active'>
          &larr; Главная страница
        </Link>
      </Pager.Item>
    </Pager>

    const body = <div>
      {pager}
      {description}
      {list}
    </div>


    const loading = 'Загрузка...'
    const error = <Redirect to="/NotFound" />

    const status = this.state.status
    const name = this.state.name
    const panelBody = status === 'loading' ? loading :
      status === 'ok' ? body : error
    const panelHeader = <h1>{name}</h1>

    return (
      <div className='container'>
        <Panel header={panelHeader} bsStyle={'primary'}>
          {panelBody}
        </Panel>
      </div>
    )
  }
}
