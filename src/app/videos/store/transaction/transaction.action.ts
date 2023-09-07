import { createAction, props } from "@ngrx/store";
import { Transaction } from "../video";


//Fetch
export const invokeTransactionAPI  = createAction(
    "[Transaction API] invoke Transaction Fetch API"
);

export const transactionFetchAPISuccess  = createAction(
    "[Transaction API] Transaction Fetch API success",
    props<{allTransactions: Transaction[]}>()
);

//Save
export const invokeSaveTransactionAPI = createAction(
    "[Transaction API] invoke save Transaction API ",
    props<{payload: Transaction}>()
);

export const saveTransactionAPISuccess = createAction(
    "[Transaction API] invoke save Transaction API success ",
    props<{payload: Transaction}>()
);

