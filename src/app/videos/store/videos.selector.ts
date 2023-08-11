import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Video, VideoCartItems } from "./video";


//This thing grabs things from the store
export const selectVideos = createFeatureSelector<Video[]>("myvideos");
export const selectCartVideos = createFeatureSelector<VideoCartItems[]>("mycartvideos");

//select cart video by id
export const selectCartVideoById = (videoID:number) => {
    return createSelector(selectCartVideos, (videos: VideoCartItems[]) => {
            var videoById = videos.filter( _ => _.video_id == videoID);

            if(videoById.length == 0){
                return null;
            }

            return videoById[0];
        }
    )
}

//this filters the things it selects
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