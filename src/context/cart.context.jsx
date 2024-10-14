import { createContext, useState, useEffect } from "react";

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

const removeCartItem = (cartItems, cartItemToRemove) => {
    // 이미 존재 하고 있는 상품인지 
    // 수량이 1인지 확인하고 1이면 카트에서 제거
    // 아니라면 감소
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,     // 장바구니가 열려 있는지 여부
    setIsCartOpen: () => {}, // 장바구니 열기/닫기 상태를 설정하는 함수
    cartItems: [],         // 장바구니에 담긴 상품 목록
    addItemToCart: () => {}, // 장바구니에 상품을 추가하는 함수
    removeItemFromCart: () => {}, // 주문서에서 상품을 제거하는 함수
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity ,0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price ,0);
        setCartTotal(newCartTotal);
    }, [cartItems])
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd)); // 상품 추가
    }

    const removeItemToCart = (cartItemToRemove) => {
      setCartItems(removeCartItem(cartItems, cartItemToRemove)); 
    };

    const clearItemFromCart = (cartItemToClear) => {
      setCartItems(clearCartItem(cartItems, cartItemToClear));
    };

    const value = {
      isCartOpen,
      setIsCartOpen,
      cartItems,
      addItemToCart,
      removeItemToCart,
      clearItemFromCart,
      cartCount,
      cartTotal,
    }; // 전역 상태 값
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};