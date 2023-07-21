import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectVideos } from '../store/videos.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private store:Store){}

  videos$ = this.store.pipe(select(selectVideos))
  
  ngOnInit(): void{

  }
}
