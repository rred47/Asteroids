import React, { Component } from 'react'
import { Panel, Pager } from 'react-bootstrap'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'


export default class NotFound extends Component {
  constructor(props) {
    super(props)

    document.title = 'Ошибка'
  }

  render() {
    const pager = <Pager>
      <Pager.Item previous href="/#">
          <Link to='/#' activeClassName='active'>
            &larr; Главная страница
          </Link>
        </Pager.Item>
    </Pager>

    const data = sessionStorage.getItem('id')
    const redirect = <Redirect to="/#" />
    sessionStorage.removeItem('id')

    const message = <h4>Астероида с идентификатором {data} не существует.</h4>
    const body = data ? message: redirect

    return (
      <div className='container'>
        <Panel header={'Ошибка'} bsStyle={'danger'}>
          {body}
          {pager}
          </Panel>
      </div>
    )
  }
}
