import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { StoreModule } from '@ngrx/store';
import { videoReducer } from './store/videos.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VideosRoutingModule,
    StoreModule.forFeature("myvideos", videoReducer),
    
  ]
})
export class VideosModule { }
