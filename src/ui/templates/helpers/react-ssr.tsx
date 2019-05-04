import React from 'react'
import handlebars from 'handlebars'
import { renderToString } from 'react-dom/server'

const App = () => <h1>Hello, world</h1>

export default () => new handlebars.SafeString(renderToString(<App />))
