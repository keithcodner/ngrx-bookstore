import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { videoCartReducer, videoReducer } from './store/videos.reducer';
import { EffectsModule } from '@ngrx/effects';
import { VideosEffects } from './store/videos.effects';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { CartComponent } from './cart/cart/cart.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { LoginComponent } from './login/login/login.component';

@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    EditComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    VideosRoutingModule,
    StoreModule.forFeature("myvideos", videoReducer),
    StoreModule.forFeature("mycartvideos", videoCartReducer),
    EffectsModule.forFeature([VideosEffects])
    
  ]
})
export class VideosModule { }
