const polka = require('polka');
const byproxy = require('byproxy-serve');
const { join } = require('path');

const app = polka();
const port = 3000;
const trig = require('./trig');

const dir = join(__dirname, 'public');
const serve = require('serve-static')(dir)

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

app.use(serve);

// Proxy an object
byproxy.serve(app, '/calculator', new Calculator());

// Proxy a module
byproxy.serve(app, '/trig', trig);

// Proxy a function
byproxy.serve(app, '/hello', function (name) {
  return 'Hello ' + name + '!';
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));