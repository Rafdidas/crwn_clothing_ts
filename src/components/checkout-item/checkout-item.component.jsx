import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import {
  CheckoutItemContainer,
  ImageContainer,
  CheckoutName,
  CheckoutQuantity,
  CheckoutPrice,
  RemoveButton
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { clearItemFromCart, addItemToCart, removeItemToCart  } = useContext(CartContext);
    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <CheckoutName>{name}</CheckoutName>
            <CheckoutQuantity>
                <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </CheckoutQuantity>
            <CheckoutPrice>${price}</CheckoutPrice>
            <RemoveButton onClick={ clearItemHandler }>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;