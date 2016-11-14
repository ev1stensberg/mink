module.exports = () => {
  /* eslint-disable */
  const templateString = '`<!doctype html public="storage"><html><meta charset=utf-8/><title>My First Server Side React App</title><div id=app>${appHtml}</div>`';
  return (
`import express from 'express'
import path from 'path'
import compression from 'compression'
import React from 'react'
import { renderToString } from 'react-dom/server'

const App = () => (<h1>Congratz! This is now rendered on the server!</h1>)

const app = express()

app.use(compression())

// send all requests to index.html so browserHistory works
app.get('/', (req, res) => {
    const appHtml = renderToString(<App/>)
    res.send(renderPage(appHtml))
})

app.get('/anotherRoute', (req, res) => {
    res.send('Another Route!')
})

function renderPage(appHtml) {
  return ${templateString}
}

const PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})`
  );
};
