const fs = require('fs')

class Till {
  constructor () {
    this.items = {}
    this.shopDetails = JSON.parse(fs.readFileSync('./hipstercoffee.json'))[0];
    this.menu = this.shopDetails.prices[0]; 
  }

  getItems () {
    return this.items;
  }

  addItem (item) {
    if (item in this.menu && !(item in this.items)) {
      this.items[item] = [this.menu[item], 1]
    } else if (item in this.items) {
      this.items[item][0] += this.menu[item]
      this.items[item][1] ++
    }
  }
}

module.exports = Till;