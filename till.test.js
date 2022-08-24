const Till = require('./till.js');

describe('Till', () => {
  it('this.items is initially empty', () => {
    const till = new Till
    expect(till.getItems()).toEqual({})
  })

  it('adds 1 item to this.items', () => {
    const till = new Till;
    till.addItem('Cafe Latte')
    expect(till.getItems()).toEqual({"Cafe Latte": {price: 4.75, amount: 1}})
  });

  it('adds multiple items to this.items', () => {
    const till = new Till;
    till.addItem('Cafe Latte')
    till.addItem('Tea')
    expect(till.getItems()).toEqual(
      {"Cafe Latte": {price: 4.75, amount: 1}, "Tea": {price: 3.65, amount: 1}})
  });

  it('adds multiple items to this.items', () => {
    const till = new Till;
    till.addItem('Tea')
    expect(till.getItems()).toEqual({"Tea": {price: 3.65, amount: 1}})

    till.addItem('Tea')
    expect(till.getItems()).toEqual({"Tea": {price: 7.3, amount: 2}})
  });

  it('getCustomerName() returns the name of the customer', () => {
    const till = new Till;
    expect(till.getCustomerName('Jane')).toEqual('Jane');
  });

});
