export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    subcategory: string;
    image: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}
export interface Category {
    id: string;
    name: string;
    mainCategory: string | null;
    subCategory: string | null;
}