import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { Video, VideoCartItems } from '../../store/video';
import { cartVideoCartByOrder, selectCartVideoById, selectCartVideos } from '../../store/videos.selector';
import { invokeAddVideoQuantityToVideoCart, invokeRemoveVideoFromVideoCart, invokeRemoveVideoQuantityFromVideoCart, invokeVideoCartFetch } from '../../store/videos.action';
import { first, map, of, reduce, take } from 'rxjs';

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

  cartVideos$ = this.store.pipe(select(cartVideoCartByOrder())); // select videos from the video cart
  //cartVideos$ = this.store.pipe(select(selectCartVideos)); // select videos from the video cart
  htmlGrandTotal$ = of({value: 0});

  ngOnInit(): void {

    this.store.dispatch(invokeVideoCartFetch());
    this.updateGrandTotal();
    
  }

  updateGrandTotal(){
    let cartVideosTotalPrice$ = this.store.pipe(select(selectCartVideos));

    // each time you use map, you loop down each hierarchy in the object/shape
    const grandTotal$ = cartVideosTotalPrice$.pipe(
      map(videoCart => videoCart.reduce((acc, val) => {
          let sub_total = (Number(val.video.cost) * Number(val.numberOfItems));
          let data:number = Number(acc) + sub_total;
          return data;
        }, 0).toFixed(2) //tofix makes it 2 decimals
      )
    );

    //actions the grand total
    grandTotal$.subscribe((data) => {
      this.htmlGrandTotal$.subscribe((total) => {
        console.log(Number(data));
        return total.value = Number(data);
      })
    });

  }

  removeFromCart(id:number){
    this.store.dispatch(invokeRemoveVideoFromVideoCart({id: id}));
  }

  removeAllFromCart(){

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
