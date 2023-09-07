import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Video, VideoCartItems } from "./../video";
import { map } from "rxjs";


//This thing grabs things from the store
export const selectVideos = createFeatureSelector<Video[]>("myvideos");
export const selectCartVideos = createFeatureSelector<VideoCartItems[]>("mycartvideos");


//select cart video by id
export const cartVideoCartByOrder = () => {
    return createSelector(selectCartVideos, (videos: VideoCartItems[]) => {
            
            //slice creates copy of array before sorting
            let sortedVideos = videos.slice().sort((a, b) => a.video_id - b.video_id);

            return sortedVideos;
        }
    )
}
