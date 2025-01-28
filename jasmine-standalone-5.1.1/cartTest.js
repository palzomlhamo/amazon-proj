import {cart, getFromStorage, addToCart} from '../data/cart.js'

describe(('Testing for cart functions'), () => {
  it(('testing for add to cart'), () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    }) 
    getFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual('1');
  })
})