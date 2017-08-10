import React, { Component } from 'react'
import ItemAsteroid from './ItemAsteroid'

import { ListGroup } from 'react-bootstrap'

export default class ListOfAsteroids extends Component {
  render() {
    const asteroids = this.props.asteroids
    const count = asteroids.length
    const size = this.props.size
    const page = this.props.page
    const needPagination = this.props.needPagination

    const listItems = Array.from({ length: count }, (v, k) =>
      <ItemAsteroid
        key={k}
        asteroid={asteroids[k]}
        pagination={page * size + k + 1}
        needPagination={needPagination}
      />
    )

    return (
      <ListGroup>
        {listItems}
      </ListGroup>
    )
  }
}
