export interface OrderItem {
    id: number;
    name: string;
    size: string | null;
    playerName: string | null;
    quantity: number;
    originalPrice: number;
    finalPrice: number;
}

export interface OrderData {
    orderNumber: string;
    date: string;
    items: OrderItem[];
    originalTotal: number;
    discountValue: number;
    discountPercent: number;
    finalTotal: number;
    discountCodesApplied: string[] | null;
    memberDiscountApplied: boolean;
}