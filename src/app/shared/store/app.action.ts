import { createAction, props } from "@ngrx/store";
import { Appstate } from "./appstate";


export const setApiStatus  = createAction(
    "[API] success or failure status",
    props<{apiStatus: Appstate}>()
);