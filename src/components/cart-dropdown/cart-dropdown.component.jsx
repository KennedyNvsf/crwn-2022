import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import { CartContext } from '../../contexts/cart.context';
import "./cart-dropdown.styles.scss";
import CartItem from '../cart-item/Cart-item.component';
import Button from "../button/button.component";

const CartDropdown = () => {

    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {

        navigate('/checkout')
    }

    return (

        <div className="cart-dropdown-container">
            <div className="cart-items">
                { cartItems.map(item => (
                    <CartItem key={item.id}  cartItem={item}/>
                 )) }
            </div>
            <Button onClick={goToCheckoutHandler}>CHECKOUT</Button> 
        </div>
    )
}

export default CartDropdown;