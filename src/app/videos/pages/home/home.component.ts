import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { cartVideoByLatestOrder, selectCartVideoById, selectVideoById, selectVideos } from '../../store/videos.selector';
import { invokeAddVideoToVideoCart, invokeDeleteVideoAPI, invokeUpdateVideoToVideoCartQuantity, invokeVideoAPI } from '../../store/videos.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { ActivatedRoute, Router } from '@angular/router';
import { Video, VideoCartItems } from '../../store/video';
import { filter, first, forkJoin, interval, map, merge, mergeAll, switchMap, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

declare var window:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
      private store:Store,
      private appStore:Store<Appstate>,
      private route:ActivatedRoute,
      private router:Router,
      private http:HttpClient
    ){}

  videos$ = this.store.pipe(select(selectVideos)); // select data from store

  deleteModal:any;
  addToCartModal:any;
  idToDelete:number = 0;
  
  ngOnInit(): void{

    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById("deleteModal")
    );

    this.addToCartModal = new window.bootstrap.Toast(
      document.getElementById("addToCartToast")
    );

    this.store.dispatch(invokeVideoAPI());
  }

  addToCart(id:number){

    // you have to use the .first() function with the forkjoin operator, because it observable needs to end first

    forkJoin({
      selectedAvailableVideo: this.store.pipe(select(selectVideoById(id))).pipe(first()),
      queryCartVideoData: this.store.pipe(select(selectCartVideoById(id))).pipe(first()),
      getLatestOrderVideoCartItem: this.store.pipe(select(cartVideoByLatestOrder())).pipe(first())
    }).subscribe((data) => {
      if(data.selectedAvailableVideo != null){ // if there is data

        let latestOrder:number = 0;
        latestOrder = Number(data.getLatestOrderVideoCartItem?.cart_order) + 1;

        if(data.getLatestOrderVideoCartItem?.cart_order === undefined ){
           latestOrder = 0;
        }

        //remake video object so cost doesn't have so many trailing/leading zeros
        let innerVideo:Video = {
          ...data.selectedAvailableVideo,
          cost: Number(data.selectedAvailableVideo.cost)
        }

        console.log(latestOrder);

        //default video cart template
        let videoCartItemDefault:VideoCartItems = {
          cart_id: crypto.randomUUID(),
          video_id: data.selectedAvailableVideo.id,
          cart_order: latestOrder,
          numberOfItems: 1,
          totalPrice: Number(data.selectedAvailableVideo.cost),
          video: innerVideo // is of type Video, like in interface
        }

        // if data is found in the video cart; update quantity
        if(data.queryCartVideoData != null){ 

          //let cartOrderIncrement:number = data.queryCartVideoData.cart_order;
          //cartOrderIncrement = Number(cartOrderIncrement) + 1;

          let numberOfItemsCount:number = data.queryCartVideoData.numberOfItems;
          numberOfItemsCount = Number(numberOfItemsCount) + 1;

          let totalsPriceCount:number = data.queryCartVideoData.totalPrice;
          totalsPriceCount = Number(numberOfItemsCount) * Number(data.queryCartVideoData.video.cost);

          let videoCartItemDefaultUpdate:VideoCartItems = {
            ...data.queryCartVideoData, //all previous data, and below are things that changed
            //cart_order: cartOrderIncrement,
            numberOfItems: numberOfItemsCount,
            totalPrice: totalsPriceCount
          }

          //console.log('update quantity of video in cart');
          //console.log(numberOfItemsCount);

          this.store.dispatch(invokeUpdateVideoToVideoCartQuantity({ video: videoCartItemDefaultUpdate })); 
          this.addToCartToastTrigger();
        }else{
          //console.log('add video to cart');

          //if there is no queryCartVideoData data found, then add a new video to the cart
          this.store.dispatch(invokeAddVideoToVideoCart({ video: videoCartItemDefault })); 
          this.addToCartToastTrigger();
        }
      }
    });

  }

  addToCartToastTrigger(){

    this.addToCartModal.show();
  }

  openDeleteModal(id:number){
    this.idToDelete = id;
    this.deleteModal.show();
  }

  closeDeleteModal(){
    this.deleteModal.hide();
  }

  confirmDelete(){
    this.store.dispatch(invokeDeleteVideoAPI({id: this.idToDelete}))

    let appState$ = this.appStore.pipe(select(selectAppState));
    appState$.subscribe((data) => {
      //console.log(data.apiStatus);
      //this.router.navigate(['/'])
      if(data.apiStatus === 'success'){
        this.appStore.dispatch(
          setApiStatus({apiStatus: {apiResponseMessage: '', apiStatus: ''}})
        );
        this.closeDeleteModal();
      }
    })
  }
}
