import {renderCheckout} from './checkout/orderSummary.js'
import { renderPayment } from './checkout/paymentSummary.js';
// import '../data/cart-class.js'
import {loadProducts} from '../data/products.js'

loadProducts(() => {
  renderCheckout();
  renderPayment();
});
