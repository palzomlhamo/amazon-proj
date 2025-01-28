class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.getFromStorage();
  }

  getFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }

  saveLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  calculateCartQuantity() {
    let cartQuant = 0;
    this.cartItems.forEach((item) => {
      cartQuant += item.quantity;
    });
    return cartQuant;
  }

  updateHeader() {
    document.querySelector('.total-amt').innerHTML = `${this.calculateCartQuantity()} items`;
  }

  addToCart(productId, quant) {
    let matchingItem;
    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += quant;
    } else {
      this.cartItems.push({
        productId,
        quantity: quant,
        deliveryID: '1'
      });
    }
    this.saveLocalStorage();
  }

  removeCart(productId) {
    let newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.updateHeader();
    this.saveLocalStorage();
  }

  updateShippingDate(productId, deliveryOptionID) {
    let matchingItem;
    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    matchingItem.deliveryID = deliveryOptionID;
    this.saveLocalStorage();
  }
}

const cart = new Cart('cart-oop');
