import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video } from './store/video';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private http:HttpClient) { }

  get(){
    return this.http.get<Video[]>("http://localhost:3000/videos");
  }
}
