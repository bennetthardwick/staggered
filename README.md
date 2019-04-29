<p align="center">
	<a href="https://github.com/bennetthardwick/staggered" title="Staggered">
    <img src="/static/staggered.svg" width="250" alt="Clipchamp">
  </a>
  <p align="center">
    A outrageously simple React library for staggering in elements.
  </p>
</p>

<p align="center">
  <img src="/static/example.gif" width="400" alt="Clipchamp">
</p>


[![NPM](https://img.shields.io/npm/v/staggered.svg)](https://www.npmjs.com/package/staggered) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save staggered
```

## Usage

```tsx
import React from 'react'

import { StaggerWrapper, Stagger } from 'staggered'

const Example  = () => <StaggerWrapper>
  <Stagger staggerId='title'>
    <h1>Title</h1>
  </Stagger>
  <Stagger staggerId='content'>
    <p>
      "..."
    </p>
  </Stagger>
</StaggerWraper>
```

## License

MIT © [bennetthardwick](https://github.com/bennetthardwick)
