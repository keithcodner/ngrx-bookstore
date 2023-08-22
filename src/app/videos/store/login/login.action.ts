import { createAction, props } from "@ngrx/store";
import { User, UserLogin } from "./../video";

//Fetch
export const invokeUserDetailsFetchAPI  = createAction(
    "[Login API] invoke login Fetch API"
);

export const invokeLoginAPI  = createAction(
    "[Login API] invoke login Fetch API",
    props<{ payload: UserLogin }>()
);

export const loginFetchAPISuccess  = createAction(
    "[Login API] login Fetch API success",
    props<{ response: User }>()
);

export const loginFetchAPIFail = createAction(
    "[Login API] login Fetch API fail",
    props<{ response: string }>()
);

