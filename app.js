const express = require('express');

const port = 8080
const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
      res.send('Hello World!');
});

app.listen(port, function () {
    console.log('Application listening on  port ' + port);
});
