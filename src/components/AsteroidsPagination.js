import React, { Component } from 'react'

import { Pagination, DropdownButton, MenuItem, ButtonToolbar} from 'react-bootstrap'

export default class AsteroidsPagination extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activePage: parseInt(props.page, 10) + 1
    }

    this.handleSelect = this.handleSelect.bind(this)
    this.handleChangeSize = this.handleChangeSize.bind(this)
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    })
    this.props.loadListOfAsteroid(eventKey - 1, this.props.size)
  }

  handleChangeSize(eventKey) {
      const upperElement = this.props.page * this.props.size

      const page = Math.floor(upperElement / eventKey)

      this.setState({
        activePage: page + 1
      })
      this.props.loadListOfAsteroid(page, eventKey)
  }

  render() {
    const pagination = <Pagination
      prev
      next
      boundaryLinks
      items={this.props.items}
      maxButtons={5}
      activePage={this.state.activePage}
      onSelect={this.handleSelect}
    />


    const menus = Array.from({length: 4}, (v, k) => {
      let size = (k + 1) * 5
      let activeMenu = size === this.props.size ? true : false

      return (
        <MenuItem
          eventKey = {size}
          key={k}
          onSelect = {this.handleChangeSize}
          active={activeMenu} >
          {size}
        </MenuItem>
      )
    })


    const size = <ButtonToolbar>
      <DropdownButton bsStyle="default" title="Размер списка" dropup id="dropup" >
        {menus}
      </DropdownButton>
    </ButtonToolbar>

    return (
      <div>
        {size}
        {pagination}
      </div>
    )
  }
}
