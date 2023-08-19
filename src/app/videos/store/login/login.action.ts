import { createAction, props } from "@ngrx/store";
import { User,  userLogin } from "./../video";

//Fetch
export const invokeLoginAPI  = createAction(
    "[Login API] invoke video Fetch API",
    props<{ payload: userLogin }>()
);

export const loginFetchAPISuccess  = createAction(
    "[Login API] login Fetch API success",
    props<{ payload: User[] }>()
);

export const loginFetchAPIFail = createAction(
    "[Login API] login Fetch API fail",
    props<{ payload: User }>()
);

