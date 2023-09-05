import { createAction, props } from "@ngrx/store";
import { Order } from "./../video";


//Fetch
export const invokeOrderAPI  = createAction(
    "[Order API] invoke Order Fetch API"
);

export const orderFetchAPISuccess  = createAction(
    "[Order API] Order Fetch API success",
    props<{allOrders: Order[]}>()
);

//Save
export const invokeSaveOrderAPI = createAction(
    "[Order API] invoke save Order API ",
    props<{payload: Order}>()
);

export const saveOrderAPISuccess = createAction(
    "[Order API] invoke save Order API success ",
    props<{response: Order}>()
);

//Update
export const invokeUpdateOrderAPI = createAction(
    "[Order API] invoke update Order API ",
    props<{payload: Order}>()
);

export const updateOrderAPISuccess = createAction(
    "[Order API] invoke update Order API success ",
    props<{response: Order}>()
);

//Delete
export const invokeDeleteOrderAPI = createAction(
    "[Order API] invoke delete Order API ",
    props<{id: number}>()
);

export const deleteOrderAPISuccess = createAction(
    "[Order API] invoke delete Order API success ",
    props<{id: number}>()
);

//--------------- CART SECTION ------------------

//Fetch Cart
export const invokeOrderCartFetch = createAction(
    "[Order API] invoke Order cart Fetch API"
);

