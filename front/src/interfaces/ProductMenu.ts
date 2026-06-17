interface Topping {
    name: string;
    quantity: number;
}

export interface ProductMenu {
    productName: string;
    description: string;
    price: number;
    hasToppings: boolean;
    toppings?: Topping[];
    img: string;
}