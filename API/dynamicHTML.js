module.exports = function (bundlePath, disableScrolling, initialState){
    let bodyStyle = ''
    if(disableScrolling)
        bodyStyle = ` style="overflow:hidden;"`
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
      <body${bodyStyle}>
        <div id="root"></div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/production/${bundlePath}"></script>
      </body>
    </html>`
}
