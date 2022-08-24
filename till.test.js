const Till = require('./till.js');

describe('Till', () => {
  it('this.items is initially empty', () => {
    const till = new Till;
    expect(till.getItems()).toEqual({})
  })

  it('adds 1 item to this.items', () => {
    const till = new Till;
    till.addItem('Cafe Latte')
    expect(till.getItems()).toEqual({"Cafe Latte": [4.75, 1]})
  });

  it('adds multiple items to this.items', () => {
    const till = new Till;
    till.addItem('Cafe Latte')
    till.addItem('Tea')
    expect(till.getItems()).toEqual({"Cafe Latte": [4.75, 1], "Tea": [3.65, 1]})
  });

  it('adds multiple items to this.items', () => {
    const till = new Till;
    till.addItem('Tea')
    expect(till.getItems()).toEqual({"Tea": [3.65, 1]})

    till.addItem('Tea')
    expect(till.getItems()).toEqual({"Tea": [7.3, 2]})
  });

});
