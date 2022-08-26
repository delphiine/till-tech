const ShopInfo = require('./shopInfo')
const shopInfo = new ShopInfo;

class Order {
  constructor () {
    this.order = {};
  }

  printMenu () {
    console.log(shopInfo.formatMenu());
    return shopInfo.formatMenu();
  }

  getOrder () {
    return this.order;
  }

  addOrder (item, customer) {
    if (!(customer in this.order)) {
      this.order[customer] = {};
    }
    if (item in shopInfo.getMenu() && !(item in this.order[customer])) {
      this.order[customer][item] = {price: shopInfo.getMenu()[item], amount: 1};
    } else if (item in this.order[customer]) {
      this.order[customer][item].price += shopInfo.getMenu()[item];
      this.order[customer][item].amount++;
    }
  }

  printReceipt () {
    console.log(this.formatReceipt());
    return this.formatReceipt();
  }
}

module.exports = Order;
