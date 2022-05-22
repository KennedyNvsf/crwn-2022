import React,{createContext, useState, useEffect} from 'react';
import SHOP_DATA from "../shop-data";
import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

//default context value
export const CategoriesContext = createContext({
    categoriesMap: {},
});



export const CategoriesProvider = ({children}) => {

    const [categoriesMap, setCategoriesMap] = useState({});

    //Only run once to populate the data then remove/comment out the code
    //so it doesn't run again'
    /* useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA)
    }, []); */

    useEffect(() => {

        const getCategoriesMap = async () => {

            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    })

    const value = { categoriesMap };

    return <CategoriesContext.Provider value={value}> { children }</CategoriesContext.Provider>
} 