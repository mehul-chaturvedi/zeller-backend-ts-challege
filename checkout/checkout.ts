import { Item, PricingRules } from "../types/checkout"

export class Checkout {
  private pricingRules;
  private items;
  constructor(pricingRules: PricingRules[]){
    this.pricingRules = new Map()
    pricingRules.forEach(rule => {
      this.pricingRules.set(rule.sku, { price: rule.price, condition: rule.condition })
    })
    this.items = new Map()
  }

  scan(item: Item) {
    if(this.items.has(item.sku)) {
      const quantity = this.items.get(item.sku)
      this.items.set(item.sku, { quantity: quantity.quantity+1, price: item.price })
    } else {
      this.items.set(item.sku, { quantity: 1, price: item.price })
    }
  }

  total(){
    let total = 0;
    for (let [item, {quantity, price}] of this.items.entries()) {
      const rule = this.pricingRules.get(item)
      if(rule) {
        total += rule.condition(quantity, rule.price) ?? (price * quantity)
      } else {
        total += price * quantity
      }
    }

    return Math.round(total);
  }

  clear() {
    this.items.clear()
  }
}