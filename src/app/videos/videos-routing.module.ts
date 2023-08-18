import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { CartComponent } from './pages/cart/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout/checkout.component';
import { OrdersComponent } from './pages/orders/orders/orders.component';
import { LoginComponent } from './pages/login/login/login.component';

const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'add', component:AddComponent },
  { path:'edit/:id', component:EditComponent },
  { path:'checkout', component:CheckoutComponent },
  { path:'checkoutCart', component:CheckoutComponent },
  { path:'checkoutPayment', component:CheckoutComponent },
  { path:'cart', component:CartComponent },
  { path:'cartAddById/:id', component:CartComponent },
  { path:'cartRemoveById/:id', component:CartComponent },
  { path:'orders', component:OrdersComponent },
  { path:'orderGet', component:OrdersComponent },
  { path:'login', component:LoginComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
