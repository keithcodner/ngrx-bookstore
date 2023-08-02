import { createFeatureSelector } from "@ngrx/store";
import { Video } from "./video";


export const selectVideos = createFeatureSelector<Video[]>("myvideos") 