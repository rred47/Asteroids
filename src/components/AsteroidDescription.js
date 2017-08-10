import React, { Component } from 'react'
import { diameterToString } from '../api'

export default class AsteroidDescription extends Component {

  render() {
    const asteroid = this.props.asteroid
    const approachesCount = asteroid.close_approach_data.length
    const id = <h4>Идентификатор: {asteroid.neo_reference_id}</h4>
    const magnitude = <h5>Абсолютная звёздная величина: {asteroid.absolute_magnitude_h}</h5>

    const minDiameter = asteroid.estimated_diameter.meters.estimated_diameter_min

    const maxDiameter = asteroid.estimated_diameter.meters.estimated_diameter_max

    const size = <h5>Диаметр: {diameterToString(minDiameter, maxDiameter)}</h5>

    const danger = <h5>Опасность астероида: {asteroid.is_potentially_hazardous_asteroid ? 'опасный' : 'безопасный'}</h5>

    const link = <a href={asteroid.nasa_jpl_url}>Ссылка на сайт NASA</a>

    const header = approachesCount > 0 ? <h5>Список приближений:</h5> : ''

    return (
      <div>
        {id}
        {danger}
        {magnitude}
        {size}
        {link}
        {header}
      </div>
    )
  }
}
