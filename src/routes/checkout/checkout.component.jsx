import './checkout.styles.scss';

import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const Checkout = () => {
    
    const { cartItems, addItemToCart } = useContext(CartContext);
    
    return (
        <div>
            <h1>Check Out</h1>
            <div>
                {
                    cartItems.map((cartItem) => {
                        const { id, name, quantity } = cartItem;
                        return(
                            <div key={id}>
                                <span>{name}</span>
                                <span>{quantity}</span>
                                <span>decrement</span>
                                <span onClick={() => addItemToCart(cartItem)}>increment</span>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    )
}

export default Checkout;