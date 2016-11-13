import express from 'express'
   import serialize from 'serialize-javascript'
   import React from 'react'
   import { renderToString } from 'react-dom/server'
   import { Provider } from 'react-redux'
   import { createMemoryHistory, match, RouterContext } from 'react-router'
   import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux'
   import { Route, IndexRoute, Link } from 'react-router'
   import { createStore, combineReducers, compose, applyMiddleware } from 'redux'

   function configureStore(history, initialState) {
    const reducer = combineReducers({
      routing: routerReducer
    })

    const store = createStore(
      reducer,
      initialState,
      compose(
        applyMiddleware(
          routerMiddleware(history)
        )
      )
    )
    return store
  }

  const App = ({ children }) => (
    <div>
      <header>
        Links:
        {' '}
        <Link to="/">Home</Link>
        {' '}
        <Link to="/foo">Foo</Link>
        {' '}
        <Link to="/bar">Bar</Link>
      </header>
      {children}
    </div>
  )

  const Home = () => (<div>Home!</div>)
  const Foo = () => (<div>Foo!</div>)
  const Bar = () => (<div>Bar!</div>)

  const routes = (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="foo" component={Foo}/>
      <Route path="bar" component={Bar}/>
    </Route>
  )

  const app = express()

  const HTML = ({ content, store }) => (
    <html>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
        <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }}/>
      </body>
    </html>
  )

  app.use(function (req, res) {
    const memoryHistory = createMemoryHistory(req.url)
    const store = configureStore(memoryHistory)
    const history = syncHistoryWithStore(memoryHistory, store)

    match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const content = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps}/>
          </Provider>
        )

        res.send('<!doctype html>' + renderToString(<HTML content={content} store={store}/>))
      }
    })
  })

  const PORT = process.env.PORT || 8080
  app.listen(PORT, function() {
    console.log('Express server running at localhost:' + PORT)
  })