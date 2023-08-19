import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { StoreModule } from '@ngrx/store';
import { videoCartReducer, videoReducer } from './store/videos.reducer';
import { EffectsModule } from '@ngrx/effects';
import { VideosEffects } from './store/videos.effects';
import { AddComponent } from './pages/add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './pages/edit/edit.component';
import { CartComponent } from './pages/cart/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout/checkout.component';
import { OrdersComponent } from './pages/orders/orders/orders.component';
import { LoginComponent } from './pages/login/login/login.component';
import { LoginEffects } from './store/login/login.effects';
import { OrderEffects } from './store/order/order.effects';
import { TransactionEffects } from './store/transaction/transaction.effects';
import { userReducer } from './store/login/login.reducer';

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
    StoreModule.forFeature("myuser", userReducer),
    EffectsModule.forFeature([VideosEffects, LoginEffects, OrderEffects, TransactionEffects])
    
  ]
})
export class VideosModule { }
