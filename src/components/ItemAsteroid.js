import React, { Component } from 'react'
import { ListGroupItem } from 'react-bootstrap'
import {diameterToString} from '../api'

export default class ItemAsteroid extends Component {

  render() {
    const asteroid = this.props.asteroid
    const needPagination = this.props.needPagination

    let header =
      `Название: ${asteroid.name}
      Идентификатор: ${asteroid.neo_reference_id}`

    if (needPagination) {
      header = `${this.props.pagination}. ` + header

    }

    const danger = asteroid.is_potentially_hazardous_asteroid ? 'да' : 'нет'

    const minDiameter = asteroid.estimated_diameter.meters.estimated_diameter_min

    const maxDiameter = asteroid.estimated_diameter.meters.estimated_diameter_max

    const size = diameterToString(minDiameter, maxDiameter)
    const approachesCount = asteroid.close_approach_data.length
    const approaches = approachesCount > 0 ? `Количество сближений: ${approachesCount}` : ``

    const body = `Опасный: ${danger}
      Звёздная величина: ${asteroid.absolute_magnitude_h}
      Размер: ${size}
       ${approaches}`
    const link = `#/details/${asteroid.neo_reference_id}`

    return (
      <ListGroupItem href={link} header={header}>
        {body}
      </ListGroupItem>
    )
  }
}
