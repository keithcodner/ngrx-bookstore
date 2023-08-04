import { createReducer, on } from "@ngrx/store";
import { Video } from "./video";
import { saveVideoAPISuccess, updateVideoAPISuccess, videoFetchAPISuccess } from "./videos.action";

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
    }),
    on(updateVideoAPISuccess, (state, {response}) => {
      let newState = state.filter(_ => _.id !== response.id );
      newState.unshift(response);

      return newState;
    })
);




