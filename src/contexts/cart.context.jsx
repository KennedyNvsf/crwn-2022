import React,{createContext, useState, useEffect} from 'react';


const addCartItem = (cartItems, productToAdd ) => {

    //FIND IF cartItems CONTAINS PRODUCTS TO ADD
    const existingCartItems = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    //IF FOUND , INCREMENT QUANTITY
    if(existingCartItems) {

        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 

            {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }


    //RETURN NEW ARRAY WITH MODIFIED cartItems/new cartItems
    return [...cartItems, {...productToAdd , quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
     
    //FIND THE CARTITEM TO REMOVE
    const existingCartItems = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    //CHECK IF QUANTITY IS EQUAL TO 1, IF IT IS THEN REMOVE THE ITEM FROM CART 
    if(existingCartItems.quantity === 1) {

        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    //RETURN BACK CARTITEMS WITH MATCHING CART ITEM WITH REDUCED QUANTITY
    return cartItems.map((cartItem) => 
            cartItem.id === cartItemToRemove.id ? 
            {...cartItem, quantity: cartItem.quantity -  1}
            : cartItem
    )
}

const clearCartItem = (cartItems, cartItemToClear ) => {

    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({

    isCartOpen: false,
    setIsCartOpen: () => {}, 
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {}, 
    clearItemFromCart: () => {}, 
    cartCount: 0,
    cartTotal: 0
});



export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0); 
    const [cartTotal, setCartTotal ] = useState(0); 

    useEffect(() => {

        const newCartCount = cartItems.reduce(( total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount); 

    }, [cartItems]);

    useEffect(() => {

        const newCartTotal = cartItems.reduce(( total, cartItem) => total + cartItem.quantity * cartItem.price, 0); 
        setCartTotal(newCartTotal); 

    }, [cartItems]);

    //adding and increasing to cart 
    const addItemToCart = (productToAdd ) => {

        setCartItems(addCartItem(cartItems, productToAdd));
    }

    //decreasing quantity  and removing from cart
    const removeItemFromCart = (cartItemToRemove ) => {

        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    //clearing or removing from cart 
    const clearItemFromCart = (cartItemToClear ) => {

        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal  };

    return (

        <CartContext.Provider value={value}>{ children }</CartContext.Provider>
    )
}