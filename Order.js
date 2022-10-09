const ShopInfo = require('./shopInfo')
const shopInfo = new ShopInfo

class OrdersBill {
  constructor () {
    this.orders = {};
  }

  getOrders () {
    return this.orders;
  }

  addOrder (item, customer) {
    if (!(customer in this.orders)) {
      this.orders[customer] = {};
    }
    if (item in shopInfo.getMenu() && !(item in this.orders[customer])) {
      this.orders[customer][item] = {price: shopInfo.getMenu()[item], amount: 1};
    } else if (item in this.orders[customer]) {
      this.orders[customer][item].amount++;
    }
  }

}

module.exports = OrdersBill;
