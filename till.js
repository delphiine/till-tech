const fs = require('fs');

class Till {
  constructor () {
    this.order = {};
    this.shopDetails = JSON.parse(fs.readFileSync('./hipstercoffee.json'))[0];
    this.menu = this.shopDetails.prices[0]; 
  }

  getOrder () {
    return this.order;
  }

  addOrder (item, customer) {
    if (!(customer in this.order)) {
      this.order[customer] = {};
    }
    if (item in this.menu && !(item in this.order[customer])) {
      this.order[customer][item] = {price: this.menu[item], amount: 1};
    } else if (item in this.order[customer]) {
      this.order[customer][item].price += this.menu[item];
      this.order[customer][item].amount++;
    }
  }

  setReceiptVariables () {
    this.customerName = "";
    this.itemName = "";
    this.amount = 0;
    this.items = {};
  }

  formatReceipt () {
    let receipt = [];
    for (let [key, value] of Object.entries(this.order)) {
      this.customerName = key;
      receipt.push(`${this.customerName}`);
      this.items = value;
      for (let [key, value] of Object.entries(this.items)) {
        this.itemName = key;
        this.amount = value.amount;
        receipt.push(`${this.amount} x ${this.itemName}`);
      }
    }
    return receipt.join('\n');
  }

  printReceipt () {
    console.log(this.formatReceipt());
    return this.formatReceipt();
  }
}

module.exports = Till;
 