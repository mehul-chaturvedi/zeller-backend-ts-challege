export interface Item {
    sku: string;
    price: number
    name: string;
}

export interface PricingRules {
    sku: string;
    condition: any;
    price: number
}