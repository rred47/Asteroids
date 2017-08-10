import React, { Component } from 'react'
import ItemApproach from './ItemApproach'

import { ListGroup } from 'react-bootstrap'

export default class ListOfApproaches extends Component {

  render() {
    const approaches = this.props.approaches
    const count = approaches.length

    const listItems = Array.from({ length: count }, (v, k) =>
      <ItemApproach
        key={k}
        approach={approaches[k]}
      />
    )

    return (
      <ListGroup>
        {listItems}
      </ListGroup>
    )
  }
}
