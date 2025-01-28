function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    
    getFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem('${localStorageKey}')) || [];
    },

    saveLocalStorage() {
      localStorage.setItem('${localStorageKey}', JSON.stringify(this.cartItems));
    },

    calculateCartQuantity() {
      let cartQuant = 0;
      this.cartItems.forEach((item) => {
        cartQuant += item.quantity;
      });
      return cartQuant;
    },

    updateHeader() {
      document.querySelector('.total-amt').innerHTML = `${this.calculateCartQuantity()} items`;
    },

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
    },

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
    },

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

  return cart;
}

const cart = Cart('cart-oop');
cart.getFromStorage();
cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
console.log(cart);
