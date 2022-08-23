const Till = require('./till.js');

describe('Till', () => {
  it('this.items is initially empty', () => {
    const till = new Till;
    expect(till.getItems()).toEqual({})
  })

});
