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

  formatReceipt () {
    let receipt = [];
    let customerName = "";
    let itemName = "";
    let amount = 0;
    this.items = {};
    for (let [key, value] of Object.entries(this.order)) {
      customerName = key;
      receipt.push(`${customerName}`);
      this.items = value;
      console.log("order", value);
      for (let [key, value] of Object.entries(this.items)) {
        itemName = key;
        amount = value.amount;
        receipt.push(`${amount} x ${itemName}`);
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
 