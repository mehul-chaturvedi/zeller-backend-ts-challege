import {Checkout} from '../checkout'

const checkout = new Checkout([ {sku: 'atv', discountPrice: 499, price: 549,condition: (quantity, price, discountPrice) => {if(quantity >= 3) return Math.floor(quantity / 3) * 2 * discountPrice + (quantity % 3) * price}},
{sku: 'ipad', discountPrice: 499, price: 549,condition: (quantity, price, discountPrice) => {if(quantity > 4) return price * quantity}}])

describe('checkout total function', () => {
  it('successfully discount on apple tv by 3 at price of 2: 3 items', () => {
    checkout.clear()
    checkout.scan({sku: 'atv', price: 549, name: 'apple tv'})
    checkout.scan({sku: 'atv', price: 549, name: 'apple tv'})
    checkout.scan({sku: 'atv', price: 549, name: 'apple tv'})
    expect(checkout.total()).toEqual(998);
  });

  it('successfully discount on apple tv by 3 at price of 2: 4 items', () => {
    checkout.clear()
    checkout.scan({sku: 'atv', price: 549, name: 'apple tv'})
    checkout.scan({sku: 'atv', price: 549, name: 'apple tv'})
    checkout.scan({sku: 'atv', price: 549, name: 'apple tv'})
    checkout.scan({sku: 'atv', price: 549, name: 'apple tv'})
    expect(checkout.total()).toEqual(1547);
  });
});