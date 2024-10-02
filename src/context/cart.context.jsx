import { createContext, useState } from "react";

// 상품이 이미 장바구니에 있는지 확인하고, 있으면 수량을 늘리고 없으면 새로 추가
export const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
    isCartOpen: false,     // 장바구니가 열려 있는지 여부
    setIsCartOpen: () => {}, // 장바구니 열기/닫기 상태를 설정하는 함수
    cartItems: [],         // 장바구니에 담긴 상품 목록
    addItemToCart: () => {}, // 장바구니에 상품을 추가하는 함수
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd)); // 상품 추가
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart }; // 전역 상태 값
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};