import React, { Component } from 'react'
import { getDateInFormat } from '../api'

import { FormControl, Form, ButtonGroup, Button } from 'react-bootstrap'

var DatePicker = require("react-bootstrap-date-picker")

export default class Filter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      name: '',
      id: '',
      danger: '',
      beginDate: '',
      endDate:''
    }

    this.handleSelectBeginDate = this.handleSelectBeginDate.bind(this)
    this.handleSelectEndDate = this.handleSelectEndDate.bind(this)
    this.handleClickPereod = this.handleClickPereod.bind(this)
    this.handleClickToMain = this.handleClickToMain.bind(this)
    this.handleClickToday = this.handleClickToday.bind(this)
    this.changeFilter = this.changeFilter.bind(this)
    this.handleDanger = this.handleDanger.bind(this)
    this.datesToDays = this.datesToDays.bind(this)
    this.handleName = this.handleName.bind(this)
    this.handleID = this.handleID.bind(this)
  }

  changeFilter(type, value) {
    let filter  = {
      name: this.state.name,
      id: this.state.id,
      danger: this.state.danger
    }

    filter[type] = value
    this.props.filterList(filter)
    this.setState(filter)
  }

  handleClickPereod() {
    if(this.datesToDays() >= 0  && this.datesToDays() < 7) {
      this.props.loadPereodList(getDateInFormat(this.state.beginDate),
      getDateInFormat(this.state.endDate))
    }
  }


  handleClickToMain(e) {
    this.props.showList()
  }

  handleClickToday(e) {
    this.props.loadPereodList()
  }

  handleSelectBeginDate(e) {
    this.setState({beginDate: e})
    if(this.state.endDate === '') {
      this.setState({endDate: e})
    }
  }

  handleSelectEndDate(e, formattedValue) {
    this.setState({endDate: e})
  }

  handleName(e) {
    this.changeFilter('name', e.target.value)
  }

  handleID(e) {
    this.changeFilter('id',e.target.value)
  }


  handleDanger(e) {
    let danger = ''
    if (e.target.id === 'danger-true') {
      danger = true
      this.changeFilter('danger', true)
    } else if(e.target.id === 'danger-false') {
      danger = false
    }

    this.changeFilter('danger', danger)
  }

  datesToDays() {
    if (this.state.beginDate === '' ||
        this.state.endDate === '') {
          return -1
    }
    let begin = new Date(this.state.beginDate)
    let end = new Date(this.state.endDate)
    let days = end - begin
    return Math.round(days / 1000 / 60 / 60/ 24)
  }

  render() {
    const today = <Button
      onClick={this.handleClickToday}>
      Загрузить сближения на сегодня
    </Button>

    const toMain = <Button
      onClick={this.handleClickToMain}>
      Вернуть список
    </Button>


    const todayButton = this.props.status === 'filterLoaded' ? toMain : today

    const trueDanger = <Button
      id={'danger-true'}
      bsStyle={this.state.danger === true && this.props.status === 'filterLoaded' ? 'primary' : 'default'}
      onClick={this.handleDanger}>
      Опасные
    </Button>

    const falseDanger = <Button
      id={'danger-false'}
      bsStyle={this.state.danger === false && this.props.status === 'filterLoaded' ? 'primary' : 'default'}
      onClick={this.handleDanger}>
      Безопасные
    </Button>

    const noneDanger = <Button
      id={'danger-none'}
      active={this.state.danger === '' || this.props.status !== 'filterLoaded' ? true : false}
      onClick={this.handleDanger}>
      Отключить
    </Button>


    let pereod = {text: '', active: false}
    if (this.datesToDays() >= 0 && this.datesToDays() < 7) {
      pereod.text = 'Сближения за переод'
      pereod.active = false
    } else if(this.datesToDays() >= 7) {
      pereod.text = 'Дата окончания должна быть не больше чем на 7 дней даты начала!'
      pereod.active = true
    } else {
      pereod.text = 'Неверный период'
      pereod.active = true
    }

    const pereodButton = <Button
      id={'danger-none'}
      active={pereod.active}
      onClick={this.handleClickPereod}>
      {pereod.text}
    </Button>

    const dayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    const monthLabels = ["Январь" ,"Февраль" ,"Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]

    const dateFormat = "DD.MM.YYYY"
    const endDateValue = this.state.endDate === '' && this.state.beginDate !== '' ?  this.state.beginDate : this.state.endDate

    const beginDate = <DatePicker
      onChange={this.handleSelectBeginDate}
      dayLabels={dayLabels}
      value={this.state.beginDate}
      dateFormat={dateFormat}
      monthLabels={monthLabels}
    />

    const endDate = <DatePicker
      onChange={this.handleSelectEndDate}
      dayLabels={dayLabels}
      value={endDateValue}
      dateFormat={dateFormat}
      monthLabels={monthLabels}
    />

  let ID = <FormControl
      type="text"
      placeholder="Идентификатор"
      onChange={this.handleID}
      value={this.props.status !== 'filterLoaded' ? '' : this.state.id}
    />

  let name = <FormControl
      type="text"
      placeholder="Название"
      onChange={this.handleName}
      value={this.props.status !== 'filterLoaded' ? '' : this.state.name}
    />

    const space = ' '

    return (
      <Form inline>
        {todayButton}
        <p className="filterName">Или загрузите период</p>
        {beginDate}
        {space}
        {endDate}
        {space}
        {pereodButton}
        <p className="filterName">Фильтры</p>
        {name}
        {space}
        {ID}
        {space}
        <ButtonGroup>
          {trueDanger}
          {falseDanger}
          {noneDanger}
        </ButtonGroup>
      </Form>
    )
  }
}
