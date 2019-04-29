import React, { Component } from 'react'

import { StaggerWrapper, Stagger } from 'staggered'
import StaggeredLogo from './staggered.svg';

export default class App extends Component {
  render () {
    const elements = [
      { 
        title: 'Hello'
      },
      { title: 'From' },
      { title: 'The' },
      { title: 'Staggered' },
      { title: 'Side' }
    ];

    return (
      <div style={{ maxWidth: '600px', margin: 'auto', marginTop: '48px' }}>
        <div style={{ top: '0', right: '0', position: 'fixed', zIndex: '1' }} dangerouslySetInnerHTML={{ __html: `<a href="https://github.com/you"><img width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_red_aa0000.png?resize=149%2C149" class="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1"></a>`}} />
        <StaggerWrapper>
          <Stagger staggerId={'logo'}>
          <div style={{ display: 'flex', position: 'relative', justifyContent: 'center' }}>
              <img alt={'Staggered Logo'} style={{ maxWidth: '300px', width: '100%', height: '94.48px' }} src={StaggeredLogo} />
          </div>
          </Stagger>
          {elements.map(({ title, content }) => <div style={{ textAlign: 'center' }} key={title}>
            <Stagger staggerId={title + '-title'}><h1>{title}</h1></Stagger>
            </div>)}         
        </StaggerWrapper>
      </div>
    )
  }
}
