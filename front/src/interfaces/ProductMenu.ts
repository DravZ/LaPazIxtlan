export interface ProductMenu {
    productName: string;
    description: string;
    price: string;
    hasToppings: boolean;
    toppings?: string[];
    img: string;
}