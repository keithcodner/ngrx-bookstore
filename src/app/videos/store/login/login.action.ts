import { createAction, props } from "@ngrx/store";
import { User, Video, VideoCartItems } from "./../video";


//Fetch
export const invokeLoginAPI  = createAction(
    "[Login API] invoke video Fetch API"
    
);

export const loginFetchAPISuccess  = createAction(
    "[Login API] login Fetch API success",
    props<{ payload: User[] }>()
);

export const loginFetchAPIFail = createAction(
    "[Login API] login Fetch API fail",
    props<{ payload: User }>()
);

