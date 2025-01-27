import {cart} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { getDeliveryOption } from '../../data/delivery-options.js';
import { priceFormat } from '../utils/money.js';

export function renderPayment() {
  let totalCost = 0;
  let shippingCost = 0;
  cart.forEach((cartItem) => {
    let product = getProduct(cartItem.productId);
    console.log(product.priceCents);
    console.log(cartItem.quantity);
    totalCost += product.priceCents * cartItem.quantity;
    let deliveryOption = getDeliveryOption(cartItem.deliveryID);
    shippingCost += deliveryOption.priceCents;
  });
  console.log(totalCost);
  let totalNoTax = totalCost + shippingCost;
  let estimatedTax = totalNoTax * 0.10;
  let orderTotal = totalNoTax + estimatedTax;

  const paymentSummaryHTML = `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (3):</div>
    <div class="payment-summary-money js-sub-total">$${priceFormat(totalCost)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money js-shipping-total">$${priceFormat(shippingCost)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money js-before-tax">$${priceFormat(totalNoTax)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money js-tax">$${priceFormat(estimatedTax)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money js-total">$${priceFormat(orderTotal)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
  `;
   document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}




