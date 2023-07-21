import { createReducer } from "@ngrx/store";
import { Video } from "./video";

export const initialState: ReadonlyArray<Video> = [{
    "id": 4,
    "video_title": "The Secret Life Of Judy Tailor",
    "creator": "Judy Tailor",
    "description": "This is a vodeo a bout dumb stuff",
    "length": 45,
    "cost": 29.99
  }];

export const videoReducer = createReducer(
    initialState 
)




