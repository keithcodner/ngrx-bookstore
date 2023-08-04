import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Video } from "./video";


//This thing grabs things from the store
export const selectVideos = createFeatureSelector<Video[]>("myvideos") 

export const selectVideoById = (videoID:number) => {
    return createSelector(selectVideos, (videos: Video[]) => {
            var videoById = videos.filter( _ => _.id == videoID);

            if(videoById.length == 0){
                return null;
            }

            return videoById[0];
        }
    )
}