import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  days: 7,
  priceCents: 0
}, {
  id: '2',
  days: 3,
  priceCents: 499
}, {
  id: '3',
  days: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryId) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (deliveryId === option.id) {
      deliveryOption = option;
    }
  });
  return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.days, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}