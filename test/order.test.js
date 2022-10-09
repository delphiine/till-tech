const OrdersBill = require('../Order');

describe('Order', () => {
  it('the order object is intial empty', () => {
    const order = new OrdersBill;
    expect(order.getOrders()).toEqual({})
  });

  it('adds 1 item to the order', () => {
    const order = new OrdersBill;
    order.addOrder('Cafe Latte', 'Jane');
    expect(order.getOrders()).toEqual(
      {"Jane": {"Cafe Latte": {"amount": 1, "price": 4.75}}}
    );
  });

  it('adds multiple items to the order', () => {
    const order = new OrdersBill;
    order.addOrder('Cafe Latte', 'Jane');
    order.addOrder('Tea','Jane');
    expect(order.getOrders()).toEqual(
      {"Jane":  {"Cafe Latte": {"amount": 1, "price": 4.75, }, "Tea": { "amount": 1, "price": 3.65}}}
    );
  });

  it('adds order by different customers', () => {
    const order = new OrdersBill;
    order.addOrder('Cafe Latte', 'Jane');
    order.addOrder('Tea','Jade');
    expect(order.getOrders()).toEqual(
      {"Jade": {"Tea": {"amount": 1, "price": 3.65}}, "Jane": {"Cafe Latte": {"amount": 1, "price": 4.75}}}
    );
  });
});
