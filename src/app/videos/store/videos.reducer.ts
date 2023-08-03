import { createReducer, on } from "@ngrx/store";
import { Video } from "./video";
import { saveVideoAPISuccess, videoFetchAPISuccess } from "./videos.action";

export const initialState: ReadonlyArray<Video> = [];

export const videoReducer = createReducer(
    initialState,
    on(videoFetchAPISuccess, (state, {allVideos}) => {
      return allVideos;
    }),
    on(saveVideoAPISuccess, (state, {response}) => {
      let newState = [...state];
      newState.unshift(response);

      return newState;
    })
);




