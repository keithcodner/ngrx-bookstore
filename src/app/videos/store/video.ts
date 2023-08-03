export interface Video {
    id: number;
    video_title: string;
    creator: string;
    description: string;
    length: number
    cost: number
}

export interface VideoState{
    videos: Video[]
}
