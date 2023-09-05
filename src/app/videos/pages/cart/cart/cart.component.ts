import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { CartCountItems, Video, VideoCartItems } from '../../../store/video';
import { cartVideoCartByOrder, selectCartVideoById, selectCartVideos } from '../../../store/videos.selector';
import { invokeAddVideoQuantityToVideoCart, invokeRemoveVideoFromVideoCart, invokeRemoveVideoQuantityFromVideoCart, invokeVideoCartFetch } from '../../../store/videos.action';
import { first, map, of, reduce, take } from 'rxjs';
import { VideosService } from 'src/app/videos/videos.service';

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
    private videoService:VideosService,
  ){ }

  cartVideos$ = this.store.pipe(select(cartVideoCartByOrder())); // select videos from the video cart
  //cartVideos$ = this.store.pipe(select(selectCartVideos)); // select videos from the video cart
  totals$ = of({cartCount:0, cartGrandTotal: 0} as CartCountItems);

  ngOnInit(): void {

    this.store.dispatch(invokeVideoCartFetch());
    this.updateSiteGrandTotal();
    
  }

  updateSiteGrandTotal(){
    this.totals$ = this.videoService.updateMainGrandTotal(selectCartVideos);
     
    console.log(this.totals$);
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
