module.exports = () => {
  const templateString = '`<!doctype html public="storage"><html><meta charset=utf-8/><title>My First Server-Side App</title><div id=app>${appHtml}</div>`';
  return (
  `import express from 'express'
  import path from 'path'
  import compression from 'compression'
  import React from 'react'
  import { renderToString } from 'react-dom/server'
  import { match, RouterContext } from 'react-router'
  // needs change and traversial later, to check if user has a route module
  import routes from '../src/index.js'

  const app = express()

  app.use(compression())

  // send all requests to index.html so browserHistory works
  app.get('*', (req, res) => {
    match({ routes, location: req.url }, (err, redirect, props) => {
      if (err) {
        res.status(500).send(err.message)
      } else if (redirect) {
        res.redirect(redirect.pathname + redirect.search)
      } else if (props) {
        // hey we made it!
        const appHtml = renderToString(<RouterContext {...props}/>)
        res.send(renderPage(appHtml))
      } else {
        res.status(404).send('Not Found')
      }
    })
  })
  function renderPage(appHtml) {
    return ${templateString}
  }

  const PORT = process.env.PORT || 8080
  app.listen(PORT, function() {
    console.log('Express server running at localhost:' + PORT)
  })`
  );
};
