module.exports = () => (
`import express from 'express'
import path from 'path'
import compression from 'compression'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
// needs change and traversial later, to check if user has a route module

const app = express()

app.use(compression())
app.use(express.static(path.resolve(__dirname, '..', 'dist')))

app.get('*', (req, res) => {
      // hey we made it!
  })

const PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Express server running at localhost:' + PORT)
})
`
);
