const fs = require('fs')

class Till {
  constructor () {
    this.items = {}
    this.customer = this.getCustomerName
    this.shopDetails = JSON.parse(fs.readFileSync('./hipstercoffee.json'))[0];
    this.menu = this.shopDetails.prices[0]; 
  }

  getItems () {
    return this.items;
  }

  getCustomerName (name) {
    return name;
  }

  addItem (item) {
    if (item in this.menu && !(item in this.items)) {
      this.items[item] = {price: this.menu[item], amount: 1};
    } else if (item in this.items) {
      this.items[item].price += this.menu[item];
      this.items[item].amount++;
    }
  }
}

module.exports = Till;
