import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { Video, VideoCartItems } from '../../store/video';
import { selectCartVideoById, selectCartVideos } from '../../store/videos.selector';
import { invokeAddVideoQuantityToVideoCart, invokeRemoveVideoFromVideoCart, invokeRemoveVideoQuantityFromVideoCart, invokeVideoCartFetch } from '../../store/videos.action';
import { first, map, reduce } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(
    private store: Store, 
    private route:ActivatedRoute,
    private router:Router,
    private appStore:Store<Appstate>,
  ){ }

  cartVideos$ = this.store.pipe(select(selectCartVideos)); // select videos from the video cart
  cartVideosTotalPrice$ = this.store.pipe(select(selectCartVideos));
  htmlGrandTotal = 0;

  ngOnInit(): void {

    this.store.dispatch(invokeVideoCartFetch());

    // each time you use map, you loop down each hierarchy in the object/shape
    const grandTotal$ = this.cartVideosTotalPrice$.pipe(
      map(videoCart => videoCart.reduce((acc, val) => {
          let data:number = Number(acc) + Number(val.totalPrice);
          return data;
        }, 0).toFixed(2)
      )
    );
    
    grandTotal$.subscribe((data) => this.htmlGrandTotal =  Number(data));
  }

  removeFromCart(id:number){
    this.store.dispatch(invokeRemoveVideoFromVideoCart({id: id}));
  }

  addQuantity(id:number, qty:number){

    let newQuantity = qty + 1;
    let videoCartItem$ = this.store.pipe(select(selectCartVideoById(id))).pipe(first());

    videoCartItem$.subscribe((data) => {
      if(data){
        let updatedVideoCartItem:VideoCartItems = {
          ...data,
          numberOfItems: newQuantity
        }
  
        this.store.dispatch(invokeAddVideoQuantityToVideoCart({id: id, videoCart: updatedVideoCartItem}));
      }
    });
    
  }

  removeQuantity(id:number, qty:number){
    let newQuantity = qty - 1;
    let videoCartItem$ = this.store.pipe(select(selectCartVideoById(id))).pipe(first());

    if(newQuantity <= 0){
      this.store.dispatch(invokeRemoveVideoFromVideoCart({id: id}));
    }else{

      videoCartItem$.subscribe((data) => {
        if(data){
          let updatedVideoCartItem:VideoCartItems = {
            ...data,
            numberOfItems: newQuantity
          }
    
          this.store.dispatch(invokeRemoveVideoQuantityFromVideoCart({id: id, videoCart: updatedVideoCartItem}));
        }
      });
    }
  }

}
