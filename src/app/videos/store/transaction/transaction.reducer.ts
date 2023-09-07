import { createReducer, on } from "@ngrx/store";
import { Transaction,  } from "./../video";
import { invokeSaveTransactionAPI } from "../transaction/transaction.action";

export const initialState: ReadonlyArray<Transaction> = []; //instantiate avaiable videos from api into available video array

//this manages the store
export const orderReducer = createReducer(
  initialState,
  // on(orderFetchAPISuccess, (state, {allOrders}) => {
  //   let newAllOrder = allOrders.map(Order => {
  //     let newOrder:Order = {
  //       ...Order,
  //       cost: Number(Order.cost)
  //     }
  //     return newOrder;
  //   });
  //   return newAllOrder;
  // }),
  on(invokeSaveTransactionAPI, (state, {payload}) => {
    let newState = [...state]; //grab whats already in the state
    newState.unshift(payload); // adds onto the existing state
    return newState; // then return it
  })
);



