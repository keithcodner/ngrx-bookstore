import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Video, VideoCartItems } from "./video";
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

//select cart video by id
export const cartVideoByLatestOrder = () => {
    return createSelector(selectCartVideos, (videos: VideoCartItems[]) => {
            const amounts = videos.map((a) => a.cart_order)
            const highestAmount = Math.max(...amounts);     
            var videoById = videos.filter( _ => _.cart_order == highestAmount);

            if(videoById.length == 0){
                return null;
            }

            return videoById[0];
        }
    )
}

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