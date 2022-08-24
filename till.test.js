const Till = require('./till.js');

describe('Till', () => {
  it('this.items is initially empty', () => {
    const till = new Till;
    expect(till.getOrder()).toEqual({});
  })

  it('adds 1 item to the order', () => {
    const till = new Till;
    till.addOrder('Cafe Latte', 'Jane');
    expect(till.getOrder()).toEqual(
      {"Jane": {"Cafe Latte": {"amount": 1, "price": 4.75}}}
    );
  });

  it('adds multiple items to the order', () => {
    const till = new Till;
    till.addOrder('Cafe Latte', 'Jane');
    till.addOrder('Tea','Jane');
    expect(till.getOrder()).toEqual(
      {"Jane":  {"Cafe Latte": {"amount": 1, "price": 4.75, }, "Tea": { "amount": 1, "price": 3.65}}}
    );
  });

  it('adds order by different customers', () => {
    const till = new Till;
    till.addOrder('Cafe Latte', 'Jane');
    till.addOrder('Tea','Jade');
    expect(till.getOrder()).toEqual(
      {"Jade": {"Tea": {"amount": 1, "price": 3.65}}, "Jane": {"Cafe Latte": {"amount": 1, "price": 4.75}}}
    );
  });

  it('sums the price and increase the amount counter', () => {
    const till = new Till;
    till.addOrder('Tea', 'Jane');
    expect(till.getOrder()).toEqual(
      {"Jane": {"Tea": {"amount": 1,"price": 3.65}}}
    );

    till.addOrder('Tea', 'Jane')
    expect(till.getOrder()).toEqual(
      {"Jane": {"Tea": {"amount": 2, "price": 7.3}}}
    );
  });

});
