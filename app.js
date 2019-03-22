const express = require('express');
const bodyParser = require('body-parser')
const byproxy = require('byproxy-serve');
const app = express();
const port = 3000;

class Calculator {
  constructor() {
    this.opCount = 0;
  }

  add(a, b) {
    this.opCount++;
    return a + b;
  }

  subtract(a, b) {
    this.opCount++;
    return a - b;
  }
}

app.use(bodyParser.json())
app.use('/', express.static('public'));

byproxy.serve(app, '/calculator', new Calculator());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));