import { createReducer, on } from "@ngrx/store";
import { Video, Order, Transaction, User } from "./video";
import { deleteVideoAPISuccess, invokeAddVideoToCart, saveVideoAPISuccess, updateVideoAPISuccess, videoFetchAPISuccess } from "./videos.action";

export const initialState: ReadonlyArray<Video> = []; //instantiate cart array
export const initialVideoCartState: ReadonlyArray<Video> = []; //instantiate cart array 

export const videoCartReducer = createReducer(
  initialVideoCartState, // the initial state of the cart will be empty
  
  // on(invokeAddVideoToCart, (state, {response}) => {
  //   let newState = [...state]; //grab whats already in the state
  //   newState.unshift(response); // adds onto the existing state

  //   return newState; // then return it
  // }),



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




