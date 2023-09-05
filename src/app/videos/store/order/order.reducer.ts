import { createReducer, on } from "@ngrx/store";
import { Order } from "./../video";
import { orderFetchAPISuccess, saveOrderAPISuccess } from "./order.action";

export const initialState: ReadonlyArray<Order> = []; //instantiate avaiable Orders from api into available Order array

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
    on(saveOrderAPISuccess, (state, {response}) => {
      let newState = [...state]; //grab whats already in the state
      newState.unshift(response); // adds onto the existing state
      return newState; // then return it
    })
);




