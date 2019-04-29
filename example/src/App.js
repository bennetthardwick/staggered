import React, { Component } from 'react'

import { StaggerWrapper, Stagger } from 'staggered'

export default class App extends Component {
  render () {
    const elements = [
      'Hello',
      'From',
      'The',
      'Stagger',
      'Side'
    ];


    return (
      <div>
        <StaggerWrapper>
          {elements.map(x => <Stagger key={x} staggerId={x}><h1>{x}</h1></Stagger>)}         
        </StaggerWrapper>
      </div>
    )
  }
}
