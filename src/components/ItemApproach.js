import React, { Component } from 'react'
import { ListGroupItem } from 'react-bootstrap'

import { distanceToString, planetToRussia } from '../api'

export default class ItemApproach extends Component {

  render() {
    const approach = this.props.approach
    const planet = planetToRussia(approach.orbiting_body)
    const velocity = parseFloat(approach.relative_velocity.kilometers_per_second).toFixed(2)

    const distance = parseInt(approach.miss_distance.kilometers, 10)
    const relativeVelocity = `Относительная скорость: ${velocity} км/c `
    const missDistance = `Расстояние пролета: ${distanceToString(distance)} `
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }

    let approachDate = new Date(approach.close_approach_date).toLocaleString("ru", options)

    return (
      <ListGroupItem header={planet}>
        {approachDate}
        <br />
        {relativeVelocity}
        <br />
        {missDistance}
      </ListGroupItem>
    )
  }
}
