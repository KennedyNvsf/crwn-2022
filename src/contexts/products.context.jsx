import React,{createContext, useState} from 'react';
import PRODUCTS from "../shop-data.json";


//default context value
export const ProductsContext = createContext({
    products: [],
});



export const ProductsProvider = ({children}) => {

    const [products, setProducts] = useState(PRODUCTS);
    const value = { products };

    return <ProductsContext.Provider value={value}> { children }</ProductsContext.Provider>
}