import { createAction, props } from "@ngrx/store";
import { Video, VideoCartItems } from "../video";


//Fetch
export const invokeVideoAPI  = createAction(
    "[Video API] invoke video Fetch API"
);

export const videoFetchAPISuccess  = createAction(
    "[Video API] video Fetch API success",
    props<{allVideos: Video[]}>()
);

//Save
export const invokeSaveVideoAPI = createAction(
    "[Video API] invoke save video API ",
    props<{payload: Video}>()
);

export const saveVideoAPISuccess = createAction(
    "[Video API] invoke save video API success ",
    props<{response: Video}>()
);

//Update
export const invokeUpdateVideoAPI = createAction(
    "[Video API] invoke update video API ",
    props<{payload: Video}>()
);

export const updateVideoAPISuccess = createAction(
    "[Video API] invoke update video API success ",
    props<{response: Video}>()
);

//Delete
export const invokeDeleteVideoAPI = createAction(
    "[Video API] invoke delete video API ",
    props<{id: number}>()
);
