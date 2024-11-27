import { AnyAction } from "redux";

import { setCartItems, setIsCartOpen } from "./cart.action";

import { CartItem } from "./cart.types";

export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
}

// 장바구니의 초기 상태를 정의
export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE, 
  action: AnyAction
): CartState => {
  if(setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if(setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    }
  }

  return state;
};
