import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import {
  CartIconContainer,
  ItemCount,
  ShoppingSvg,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
    const {  isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleCartOpen}>
            <ShoppingSvg />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;