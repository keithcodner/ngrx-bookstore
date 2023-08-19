import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User, Video, VideoCartItems } from "./../video";
import { map } from "rxjs";


//This thing grabs things from the store
export const selectUser = createFeatureSelector<User[]>("myuser");


