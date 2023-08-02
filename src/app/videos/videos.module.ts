import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { videoReducer } from './store/videos.reducer';
import { EffectsModule } from '@ngrx/effects';
import { VideosEffects } from './store/videos.effects';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [
    HomeComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    VideosRoutingModule,
    StoreModule.forFeature("myvideos", videoReducer),
    EffectsModule.forFeature([VideosEffects])
    
  ]
})
export class VideosModule { }
