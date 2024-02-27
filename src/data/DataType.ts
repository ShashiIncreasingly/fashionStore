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
}
export interface Rating {
    rate: number;
    count: number;
}

// export interface IProducts {
//     name: string;
//     price: number;
//     timeStamp: { seconds: number; nanoseconds: number };
//     catagory: string;
//     description: string;
//     discountPercent: number;
//     features: string[];
//     id: string;
//     imageUrls: string[];
//     inStock: boolean;
//     quantity: number;
//   }
interface ICart {
    totalPrice: number;
    products: ProductsArray[];
}
export type { ICart };