const path = require('path')
const Express = require('express')

const app = Express()
const port = 8192

console.log(__dirname)
app.use('/public', Express.static(path.join(__dirname, '..', '/public')))

// We are going to fill these out in the sections to follow
app.get('/admin', function (req, res) {
    const defaultStore = require('../src/app/data/defaultStore.js')
    defaultStore.spreadsheet.totalDays = 14
    res.send(renderFullPage(defaultStore))
});

function renderFullPage(preloadedState) {
    return '' +
    `<!doctype html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Hotel Tabuba</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,500"
        rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">
        <style>html {font-family: 'Roboto', sans-serif;} body {font-size: 13px; line-height: 20px;}
        </style>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="public/bundle.js"></script>
      </body>
    </html>`
}

app.listen(port)
