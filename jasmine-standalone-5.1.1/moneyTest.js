import { priceFormat } from "../scripts/utils/money.js";

describe(('priceFormat'), () => {
  it(('general test'), () => {
    expect(priceFormat(2095)).toEqual('20.95');
  });
  it(('edge case 1: if 0'), () => {
    expect(priceFormat(0)).toEqual('0.00');
  });
  it(('edge case 2: if decimal'), () => {
    expect(priceFormat(2000.5)).toEqual('20.01');
  });
})