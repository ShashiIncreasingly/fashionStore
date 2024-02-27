import { ProductsArray } from "../data/DataType";

const GetProductsApi = async (URL : string) => {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: ProductsArray[] = await response.json();
        return data;
        // setProducts(data);
    } catch (error) {
        return [];
    }
}

export default GetProductsApi;