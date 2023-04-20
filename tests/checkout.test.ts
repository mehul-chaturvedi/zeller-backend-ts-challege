import {Checkout} from '../checkout/checkout'

const checkout = new Checkout([ {sku: 'atv', price: 109,condition: (quantity, price) => {if(quantity >= 3) return Math.floor(quantity / 3) * 2 * price + (quantity % 3) * price}},
{sku: 'ipad', price: 499,condition: (quantity, price) => {if(quantity > 4) return price * quantity}}])

describe('checkout total function', () => {
  it('no discount on apple tv by 3 at price of 2: 2 items', () => {
    checkout.clear()
    checkout.scan({sku: 'atv', price: 109, name: 'Apple TV'})
    checkout.scan({sku: 'atv', price: 109, name: 'Apple TV'})
    expect(checkout.total()).toEqual(218);
  });

  it('successfully discount on apple tv by 3 at price of 2: 3 items', () => {
    checkout.clear()
    checkout.scan({sku: 'atv', price: 109, name: 'Apple TV'})
    checkout.scan({sku: 'atv', price: 109, name: 'Apple TV'})
    checkout.scan({sku: 'atv', price: 109, name: 'Apple TV'})
    expect(checkout.total()).toEqual(218);
  });

  it('successfully discount on apple tv by 3 at price of 2: 4 items', () => {
    checkout.clear()
    checkout.scan({sku: 'atv', price: 109, name: 'Apple TV'})
    checkout.scan({sku: 'atv', price: 109, name: 'Apple TV'})
    checkout.scan({sku: 'atv', price: 109, name: 'Apple TV'})
    checkout.scan({sku: 'atv', price: 109, name: 'Apple TV'})
    expect(checkout.total()).toEqual(327);
  });

  it('no discount on ipad if more than 4 then price will be: 3 items', () => {
    checkout.clear()
    checkout.scan({sku: 'ipad', price: 549, name: 'Super iPad'})
    checkout.scan({sku: 'ipad', price: 549, name: 'Super iPad'})
    checkout.scan({sku: 'ipad', price: 549, name: 'Super iPad'})
    expect(checkout.total()).toEqual(1647);
  });

  it('successfully discount on ipad if more than 4 then price will be: 5 items', () => {
    checkout.clear()
    checkout.scan({sku: 'ipad', price: 549, name: 'Super iPad'})
    checkout.scan({sku: 'ipad', price: 549, name: 'Super iPad'})
    checkout.scan({sku: 'ipad', price: 549, name: 'Super iPad'})
    checkout.scan({sku: 'ipad', price: 549, name: 'Super iPad'})
    checkout.scan({sku: 'ipad', price: 549, name: 'Super iPad'})
    expect(checkout.total()).toEqual(2495);
  });
});