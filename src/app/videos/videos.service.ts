import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video } from './store/video';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private http:HttpClient) { }

  //----------------------  Home Endpoints ----------------------
  get(){
    return this.http.get<Video[]>("http://localhost:3000/videos");
  }

  saveVideo(payload:Video){
    return this.http.post<Video>("http://localhost:3000/videos", payload);
  }

  update(payload:Video){
    return this.http.put<Video>(`http://localhost:3000/videos/${payload.id}`, payload);
  }

  delete(id:number){
    return this.http.delete(`http://localhost:3000/videos/${id}`);
  }

  //---------------------- Auth End points ----------------------
  login(payload:Video){
    return this.http.post(`http://localhost:3000/auth`, payload);
  }


  //---------------------- Cart End points ----------------------

  //---------------------- Checkout Endpoints ----------------------

  //---------------------- Order Endpoints ----------------------
}
