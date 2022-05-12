import React,{createContext, useState, useEffect} from 'react';
import SHOP_DATA from "../shop-data";
import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';

//default context value
export const ProductsContext = createContext({
    products: [],
});



export const ProductsProvider = ({children}) => {

    const [products, setProducts] = useState([]);

    //Only run once to populate the data then remove/comment out the code
    //so it doesn't run again'
    /* useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA)
    }, []); */

    const value = { products };

    return <ProductsContext.Provider value={value}> { children }</ProductsContext.Provider>
} 