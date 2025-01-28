import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import {priceFormat} from './utils/money.js';

loadProducts(loadProductsGrid);

function loadProductsGrid() {
  const outerGrid = document.querySelector('.products-grid');
  let html = '';
  products.forEach((product, index) => {
    html += `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="${product.getStarsURL()}">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      ${product.getPrice()}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-select-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-${product.id}">
      <img src="images/icons/checkmark.png">Added
    </div>  

    <button class="add-to-cart-button button-primary js-add-cart"
      data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>`;
  });
  outerGrid.innerHTML = html;

  const timeoutID = {};
  updateCart();

  function addedAppear(productId) {
    clearTimeout(timeoutID[productId]);
      document.querySelector(`.js-added-${productId}`).classList.add('make-visible');
      timeoutID[productId] = setTimeout(() => {
        document.querySelector(`.js-added-${productId}`).classList.remove('make-visible');
      }, 2000);
  }

  function updateCart() {
    document.querySelector('.cart-quantity').innerHTML = calculateCartQuantity() || '';
  }

  document.querySelectorAll('.js-add-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const quant = Number(document.querySelector(`.js-quantity-select-${productId}`).value);
      addToCart(productId, quant);
      addedAppear(productId);
      updateCart();
    });
  });
}
