const Order = require('../Order');

describe('Order', () => {
  it('prints the menu', () => {
    const order = new Order;
    expect(order.printMenu()).toMatch('Tiramisu: $11.4');
    expect(order.printMenu()).toMatch('Cafe Latte: $4.75');
  });

  it('the order object is intial empty', () => {
    const order = new Order;
    expect(order.getOrder()).toEqual({})
  });

  it('adds 1 item to the order', () => {
    const order = new Order;
    order.addOrder('Cafe Latte', 'Jane');
    expect(order.getOrder()).toEqual(
      {"Jane": {"Cafe Latte": {"amount": 1, "price": 4.75}}}
    );
  });

  it('adds multiple items to the order', () => {
    const order = new Order;
    order.addOrder('Cafe Latte', 'Jane');
    order.addOrder('Tea','Jane');
    expect(order.getOrder()).toEqual(
      {"Jane":  {"Cafe Latte": {"amount": 1, "price": 4.75, }, "Tea": { "amount": 1, "price": 3.65}}}
    );
  });

  it('adds order by different customers', () => {
    const order = new Order;
    order.addOrder('Cafe Latte', 'Jane');
    order.addOrder('Tea','Jade');
    expect(order.getOrder()).toEqual(
      {"Jade": {"Tea": {"amount": 1, "price": 3.65}}, "Jane": {"Cafe Latte": {"amount": 1, "price": 4.75}}}
    );
  });
});
