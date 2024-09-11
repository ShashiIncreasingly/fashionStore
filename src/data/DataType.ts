export interface ProductsArray {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
    quantity?: number | undefined
    discountPercent?: number;
    totalProductPrice? : number
}
export interface Rating {
    rate: number;
    count: number;
}

interface ICart {
    totalPrice: number;
    products: ProductsArray[];
}
export type { ICart };