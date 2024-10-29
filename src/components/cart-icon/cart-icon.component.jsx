import { useDispatch, useSelector } from "react-redux";

import { selectCartCount, selectCartOpen } from "../../store/cart/cart.selector.js";
import { setIsCartOpen } from "../../store/cart/cart.action.js";

import {
  CartIconContainer,
  ItemCount,
  ShoppingSvg,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectCartOpen);
    
    const toggleCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <CartIconContainer onClick={toggleCartOpen}>
            <ShoppingSvg />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;