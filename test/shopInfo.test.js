const ShopInfo = require('../shopInfo')

describe('ShopInfo', () => {
  it('returns shop name', () => {
    const shop = new ShopInfo;
    expect(shop.getShopName()).toEqual("The Coffee Connection");
  })

  it('returns shop address', () => {
    const shop = new ShopInfo;
    expect(shop.getAddress()).toEqual("123 Lakeside Way");
  })

  it('returns shop phone', () => {
    const shop = new ShopInfo;
    expect(shop.getPhoneNumber()).toEqual("+1 (650) 360-0708");
  })

  it('returns shop menu as a string', () => {
    const shop = new ShopInfo;
    expect(shop.formatMenu()).toMatch('Tiramisu: $11.4');
    expect(shop.formatMenu()).toMatch('Cafe Latte: $4.75');
  })
});