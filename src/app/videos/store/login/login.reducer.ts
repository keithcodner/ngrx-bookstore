import { createReducer, on } from "@ngrx/store";
import { Video, Order, Transaction, User, VideoCartItems } from "./../video";
import { invokeLoginAPI, loginFetchAPIFail, loginFetchAPISuccess } from "./login.action";

export const initialState: ReadonlyArray<User> = []; //instantiate avaiable videos from api into available video array
export const userReducer = createReducer(
  initialState, // the initial state of the cart will be empty
    on(loginFetchAPISuccess, (_state, {payload}) => {
      return payload;
    }),
    on(loginFetchAPIFail, (state, {payload}) => {
      let newState = [...state]; //grab whats already in the state
      return newState; // then return it
    })
  );



