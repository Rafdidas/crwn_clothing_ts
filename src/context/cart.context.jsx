import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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
//특정 상품을 장바구니에서 완전히 제거
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
// 장바구니 상태 업데이트를 위한 액션 타입을 정의
const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}
// 장바구니의 초기 상태를 정의
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
}

export const CartProvider = ({children}) => {
    const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
          (total, cartItem) => total + cartItem.quantity,
          0
        );

        const newCartTotal = newCartItems.reduce(
          (total, cartItem) => total + cartItem.quantity * cartItem.price,
          0
        );

        dispatch(
          createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            cartCount: newCartCount,
          })
        );
    }
    
    const addItemToCart = (productToAdd) => {
      const newCartItems = addCartItem(cartItems, productToAdd); // 상품 추가
      updateCartItemsReducer(newCartItems);
    }

    const removeItemToCart = (cartItemToRemove) => {
      const newCartItems = removeCartItem(cartItems, cartItemToRemove); // 상품 감소, 제거
      updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
      const newCartItems = clearCartItem(cartItems, cartItemToClear); // 상품 제거
      updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {

        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

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

