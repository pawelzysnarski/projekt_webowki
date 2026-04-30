export interface Product {
    id: number;
    name: string;
    price: number | string;
    category: string;
    subcategory: string;
    image: string;
    image_front?: string;
    image_back?: string;
}

export interface CartItemWithSize {
    id: string;
    product: Product;
    size: string;
    quantity: number;
    playerName?: string;
}