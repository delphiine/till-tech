const hipsterCoffee = require('./hipstercoffee.json');

class Till {
  constructor () {
    this.items = {};
  }

  getItems () {
    return this.items;
  }
}

module.exports = Till;
