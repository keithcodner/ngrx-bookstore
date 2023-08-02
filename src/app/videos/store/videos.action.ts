import { createAction, props } from "@ngrx/store";
import { Video } from "./video";

export const invokeVideoAPI  = createAction(
    "[Video API] invoke video Fetch API"
);

export const videoFetchAPISuccess  = createAction(
    "[Video API] video Fetch API success",
    props<{allVideos:Video[]}>()
);
