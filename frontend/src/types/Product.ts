export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    subcategory: string;
    image: string;
}

export interface CartItemWithSize {
    id: string;
    product: Product;
    size: string;
    quantity: number;
}