import { AnyAction } from "redux";

import { 
  signInSuccess,
  signOutSuccess,
  signUpFailed,
  signOutFailed,
  signInFailed
} from "./user.action";

import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

//상태를 업데이트하는 함수
export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {

  if(signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }

  if(signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }

  if(signInFailed.match(action) || signOutFailed.match(action) || signUpFailed.match(action)) {
    return { ...state, error: action.payload };
  }

  return state;
};
