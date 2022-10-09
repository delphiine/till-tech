const ShopInfo = require('./shopInfo')

class Till {
  constructor (order, shopInfo, payment) {
    this.order = order;
    this.payment = payment;
    this.shopInfo = shopInfo;
    if (!shopInfo) {
      this.shopInfo = new ShopInfo();
    }
  }

  getPreTaxTotal () {
    const order = this.order.getOrders()
    let totalPrice = 0
    for (const [customer, value] of Object.entries(order)) {
      for (const [itemName, item] of Object.entries(value)) {
        let totalItemCustomerPrice = item.price * item.amount;
        if (itemName.includes('Muffin')) {
          totalItemCustomerPrice *= 0.9;
        }
        totalPrice += totalItemCustomerPrice;
      }
    }

    if (totalPrice >= 50) {
      totalPrice *= 0.95;
    }
    return this.getTwoDecimals(totalPrice)
  }

  getTotalTax(totalPrice) {
    return this.getTwoDecimals(totalPrice * 0.0864)
  }

  getTwoDecimals(number) {
    return Number((Math.round(number * 100) / 100).toFixed(2));
  }

  formatReceipt () {
    let receipt = [];
    // First we add the restaurant information
    receipt.push(new Date().toLocaleString());
    receipt.push(this.shopInfo.getShopName());
    receipt.push(this.shopInfo.getAddress());
    receipt.push(this.shopInfo.getPhoneNumber());
    receipt.push("Voucher 10% off all Muffins");
    receipt.push("Valid 2022/08/01 to 2022/08/31");

    // Add order information
    for (let [key, value] of Object.entries(this.order.getOrders())) {
      receipt.push(`${key}`);
      for (let [itemName, item] of Object.entries(value)) {
        let amount = item.amount;
        let price = item.price;
        receipt.push(`${itemName} ${amount} x ${price}`);
      }
    }

    // We add the billing information now
    let totalPrice = this.getPreTaxTotal();
    let totalTax = this.getTotalTax(totalPrice);
    receipt.push(`Tax: ${totalTax}`);
    receipt.push(`Total: ${totalPrice + totalTax}`);
    receipt.push(`Cash: ${this.payment}`);
    receipt.push(`Change: ${this.payment - (totalPrice + totalTax)}`)
    return receipt;
  }

  printReceipt () {
    let receipt = this.formatReceipt().join('\n');
    console.log(receipt);
    return receipt;
  }
}

module.exports = Till;
