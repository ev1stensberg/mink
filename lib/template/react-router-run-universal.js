module.exports = () => (
    `import Express from 'express';
    import React from 'react';
    import ReactDOM from 'react-dom/server';
    import config from '../webpack/config';
    import compression from 'compression';
    import httpProxy from 'http-proxy';
    import path from 'path';
    import Html from '../Html';
    import PrettyError from 'pretty-error';

    import { match, RouterContext } from 'react-router';
    import routes from '../src/index';

    const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
    const pretty = new PrettyError();
    const app = new Express();

    app.use(compression());

    app.use(Express.static(path.join(__dirname, '..')));

    // added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527

    app.use((req, res) => {
      if (__DEVELOPMENT__) {
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        webpackIsomorphicTools.refresh();
      }
      function hydrateOnClient() {
        res.send('<!doctype html>'  +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()}/>));
      }

      if (__DISABLE_SSR__) {
        hydrateOnClient();
        return;
      }

      match({ routes: routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
          res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
          console.error('ROUTER ERROR:', pretty.render(error));
          res.status(500);
          hydrateOnClient();
        } else if (renderProps) {
            const component = (
              <RouterContext {...renderProps}/>
            );

            res.status(200);

            global.navigator = {userAgent: req.headers['user-agent']};
            res.send('<!doctype html>' +
              ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component}/>));
        } else {
          res.status(404).send('Not found');
        }
      });
    });

    if (config.port) {
      app.listen(config.port, (err) => {
        if (err) {
          console.error(err);
        }
        console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
      });
    } else {
      console.error('==>     ERROR: No PORT environment variable has been specified');
    }`
);
