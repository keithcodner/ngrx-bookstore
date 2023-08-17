export interface Video {
    id: number;
    video_title: string;
    creator: string;
    description: string;
    img_path: string;
    length: number;
    cost: number;
}

export interface VideoCartItems{
    cart_id: string;
    video_id:number;
    cart_order:number;
    numberOfItems:number;
    totalPrice: number;
    video:Video;
}


export interface Order {
    id: number;
    user_id: number;
    prod_id: number;
    trans_id: number;
    order_num: string;
    details: string;
    total: string;
    created_at: Date;
    updated_at: Date;
}

export interface Transaction {
    id: number;
    user_id: number;
    product_id: number;
    order_num: string;
    trans_id: string;
    video_title: string;
    created_at: Date;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    other: string;
    created_at: Date;
}


export interface VideoState{
    videos: Video[]
}
