export interface Item {
    sku: string;
    price: number
    name: string;
}

export interface PricingRules {
    sku: string;
    discountPrice: number;
    condition: any;
    price: number
}