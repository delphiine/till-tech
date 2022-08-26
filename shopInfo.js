const fs = require('fs');

class ShopInfo {
  constructor () {
    this.shopDetails = JSON.parse(fs.readFileSync('./hipstercoffee.json'))[0];
    this.menu = this.shopDetails.prices[0]; 
  }

  getShopName () {
    return this.shopDetails.shopName;
  }

  getAddress () {
    return this.shopDetails.address;
  }
  

  formatPhoneNumber () {
    const value = this.shopDetails.phone;
    const match = value
    .replace(/\D+/g, '').replace(/^1/, '')
    .match(/([^\d]*\d[^\d]*){1,11}$/)[0];
    const part1 = match.length > 2 ? `+1 (${match.substring(0,3)})` : match;
    const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : '';
    const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : '';    
    return `${part1}${part2}${part3}`;
  }

  getPhoneNumber () {
    return this.formatPhoneNumber();
  }

  formatMenu () {
    const menuHeader = 'Welcom to The Coffee Connection\n\nTodays Menu:\n';
    let menuItems = "";
    for (const [key, value] of Object.entries(this.menu)) {
      menuItems += `${key}: $${value}\n`;
    }
    return menuHeader + menuItems;
  }
}

module.exports = ShopInfo;