import {products} from '../data/products.js';

export let cart;

getFromStorage();
export function getFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}


function saveLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCartQuantity() {
  let cartQuant = 0;
  cart.forEach((item) => {
    cartQuant += item.quantity;
  });
  return cartQuant;
}

function updateHeader() {
  document.querySelector('.total-amt').innerHTML = `${calculateCartQuantity()} items`;
}

export function addToCart(productId, quant) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += quant;
  } else {
    cart.push({
      productId,
      quantity: quant,
      deliveryID: '1'
    });
  }
  saveLocalStorage();
}

export function removeCart(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  updateHeader();
  saveLocalStorage();
}

export function updateShippingDate(productId, deliveryOptionID) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryID = deliveryOptionID;
  saveLocalStorage();
}
