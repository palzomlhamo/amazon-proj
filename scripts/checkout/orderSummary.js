import {cart, removeCart, calculateCartQuantity, updateShippingDate} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {priceFormat} from '../utils/money.js';
import {deliveryOptions, calculateDeliveryDate} from '../../data/delivery-options.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderPayment } from './paymentSummary.js';

export function renderCheckout() {
  let html = '';
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct = getProduct(productId);
    const deliveryID = cartItem.deliveryID;
    let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (deliveryID === option.id) {
        deliveryOption = option;
      }
    });
    const dateString = calculateDeliveryDate(deliveryOption);

    html += `
    <div class="cart-item-container cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input">
            <span class="save-quantity-link link-primary">Save</span>
            <span class="delete-quantity-link link-primary js-delete-button" 
              data-product="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    </div>`;
  });

  document.querySelector('.order-summary').innerHTML = html;

  document.querySelectorAll('.js-delete-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productID = button.dataset.product;
      removeCart(productID);

      /* const container = document.querySelector(`.cart-item-container-${productID}`);
      container.remove(); */
      renderCheckout();
      renderPayment();
    })
  })

  document.querySelectorAll('.js-update').forEach((updateLink) => {
    updateLink.addEventListener('click', () => {
      const productId = updateLink.dataset.productId;

    })
  })


  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let deliveryHTML = '';
    deliveryOptions.forEach((option) => {
      const dateString = calculateDeliveryDate(option);
      const priceCents = option.priceCents === 0 ? 'FREE' : `$${priceFormat(option.priceCents)} -`;
      const isChecked = option.id === cartItem.deliveryID;

      deliveryHTML += 
        `<div class="delivery-option js-delivery-option" data-product="${matchingProduct.id}"
          data-delivery-id="${option.id}">
          <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"/>
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceCents} Shipping
            </div>
          </div>
        </div>`;
    });
    return deliveryHTML;
  }

  let cartQuant = 0;
  cart.forEach((item) => {
    cartQuant += item.quantity;
  });
  document.querySelector('.total-amt').innerHTML = `${calculateCartQuantity()} items`;

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {product, deliveryId} = element.dataset;
      updateShippingDate(product, deliveryId);
      renderCheckout();
      renderPayment();
    });
  });
}