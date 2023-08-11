import { createReducer, on } from "@ngrx/store";
import { Video, Order, Transaction, User, VideoCartItems } from "./video";
import { deleteVideoAPISuccess, invokeAddVideoToVideoCart, invokeUpdateVideoToVideoCartQuantity, saveVideoAPISuccess, updateVideoAPISuccess, videoCartFetchSuccess, videoFetchAPISuccess } from "./videos.action";

export const initialState: ReadonlyArray<Video> = []; //instantiate avaiable videos from api into available video array
//instantiate cart video array, for selected video to be put into video cart array
export const initialVideoCartState: ReadonlyArray<VideoCartItems> = []

export const videoCartReducer = createReducer(
    initialVideoCartState, // the initial state of the cart will be empty
    on(videoCartFetchSuccess, (state, {allCartVideos}) => {
      return allCartVideos;
    }),
    on(invokeAddVideoToVideoCart, (state, {video}) => {
      let newState = [...state]; //grab whats already in the state
      newState.unshift(video); // adds onto the existing state

      return newState; // then return it
    }),
    on(invokeUpdateVideoToVideoCartQuantity, (state, {video}) => {
      let newState = state.filter(_ => _.id !== video.id ); //filter the state that we need to update and grab it
      newState.unshift(video); // update it 

      return newState; // then return it
    }),
  );

//this manages the store
export const videoReducer = createReducer(
    initialState,
    //state; is the normal existing state
    //id; is the properties of the action method
    on(videoFetchAPISuccess, (state, {allVideos}) => {
      return allVideos;
    }),
    on(saveVideoAPISuccess, (state, {response}) => {
      let newState = [...state]; //grab whats already in the state
      newState.unshift(response); // adds onto the existing state

      return newState; // then return it
    }),
    on(updateVideoAPISuccess, (state, {response}) => {
      let newState = state.filter(_ => _.id !== response.id ); //filter the state that we need to update and grab it
      newState.unshift(response); // update it 

      return newState; // then return it
    }),
    on(deleteVideoAPISuccess, (state, {id}) => {
      let newState = state.filter(_ => _.id !== id ); // find the existing state
      return newState; //return it
    })
);




