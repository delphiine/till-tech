const Till = require('../till');
const OrdersBill = require('../order');
const ShopInfo = require('../shopInfo')

describe('Till', () => {
  it('test getPreTaxTotal no discount', () => {
    const order = new OrdersBill();
    order.addOrder('Tea', 'Jane');
    order.addOrder('Tea', 'Jane');
    order.addOrder('Tea', 'Jane');
    order.addOrder('Cafe Latte', 'Jane');
    order.addOrder('Cortado', 'Bob');
    const till = new Till(order);

    expect(till.getPreTaxTotal()).toEqual(20.25);
  });

  it('test getPreTaxTotal with Muffin discount', () => {
    const order = new OrdersBill();
    order.addOrder('Blueberry Muffin', 'Jane');
    const till = new Till(order);

    // 4.05 * 0.9
    expect(till.getPreTaxTotal()).toEqual(3.65);
  });

  it('test getPreTaxTotal with > 50$ discount', () => {
    const order = new OrdersBill();
    order.addOrder('Tea', 'Jane');
    order.addOrder('Tea', 'Jane');
    order.addOrder('Tea', 'Jane');
    order.addOrder('Cafe Latte', 'Jane');
    order.addOrder('Cortado', 'Bob');
    order.addOrder('Affogato', 'Bob');
    order.addOrder('Tiramisu', 'Alice');
    order.addOrder('Affogato', 'Alice');
    const till = new Till(order);

    expect(till.getPreTaxTotal()).toEqual(58.19);
  });

  it('test getTotalTax', () => {
    const order = new OrdersBill();
    const till = new Till(order);

    expect(till.getTotalTax(58.19)).toEqual(5.03);
  });

  it('test formatReceipt', () => {
    const order = new OrdersBill();
    let customer1 = "Jane";
    let customer2 = "Bob";
    order.addOrder('Tea', customer1);
    order.addOrder('Tea', customer1);
    order.addOrder('Cafe Latte', customer1);
    order.addOrder('Affogato', customer2);
    let shopInfo = new ShopInfo();
    let fakeShopName = "hello"
    let fakeShopAddress = "123 street"
    let fakePhoneNumber = "12345"
    jest.spyOn(shopInfo, 'getShopName').mockImplementation(() => fakeShopName);
    jest.spyOn(shopInfo, 'getAddress').mockImplementation(() => fakeShopAddress);
    jest.spyOn(shopInfo, 'getPhoneNumber').mockImplementation(() => fakePhoneNumber);
    jest.useFakeTimers().setSystemTime(new Date('2022-08-22').getTime());
    const till = new Till(order, shopInfo, 50);

    expectedResult = [
      new Date().toLocaleString(),
      fakeShopName,
      fakeShopAddress,
      fakePhoneNumber,
      "Voucher 10% off all Muffins",
      "Valid 2022/08/01 to 2022/08/31",
      customer1,
      "Tea 2 x 3.65",
      "Cafe Latte 1 x 4.75",
      customer2,
      "Affogato 1 x 14.8",
      "Tax: 2.32",
      "Total: 29.17",
      "Cash: 50",
      "Change: 20.83"
    ]

    expect(till.formatReceipt()).toEqual(expectedResult);
  });
});
