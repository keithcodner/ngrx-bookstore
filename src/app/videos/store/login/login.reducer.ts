import { createReducer, on } from "@ngrx/store";
import { Video, Order, Transaction, User, VideoCartItems } from "./../video";
import { invokeLoginAPI, loginFetchAPIFail, loginFetchAPISuccess } from "./login.action";

export const initialState: ReadonlyArray<User> = []; 

export const userReducer = createReducer(
    initialState,
    on(loginFetchAPISuccess, (state, {response}) => {
      let newState = state.filter(_ => _.id == 0 ); 
      newState.unshift(response); 
      return newState; 
    }),
    on(loginFetchAPIFail, (state, {response}) => {
      return [];
    }),
  );



