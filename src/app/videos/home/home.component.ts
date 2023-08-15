import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectCartVideoById, selectVideoById, selectVideos } from '../store/videos.selector';
import { invokeAddVideoToVideoCart, invokeDeleteVideoAPI, invokeUpdateVideoToVideoCartQuantity, invokeVideoAPI } from '../store/videos.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { ActivatedRoute, Router } from '@angular/router';
import { Video, VideoCartItems } from '../store/video';
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
    let selectedAvailableVideo$ = this.store.pipe(select(selectVideoById(id))).pipe(first());
    let queryCartVideoData$ = this.store.pipe(select(selectCartVideoById(id))).pipe(first());

    forkJoin({
      selectedAvailableVideo: selectedAvailableVideo$,
      queryCartVideoData: queryCartVideoData$
    }).subscribe((data) => {
      if(data.selectedAvailableVideo != null){ // if there is data

        //default video cart template
        let videoCartItemDefault:VideoCartItems = {
          cart_id: crypto.randomUUID(),
          video_id: data.selectedAvailableVideo.id,
          numberOfItems: 1,
          totalPrice: data.selectedAvailableVideo.cost,
          video: data.selectedAvailableVideo // is of type Video, like in interface
        }

        // if data is found in the video cart; update quantity
        if(data.queryCartVideoData != null){ 

          let numberOfItemsCount:number = data.queryCartVideoData.numberOfItems;
          numberOfItemsCount = numberOfItemsCount + 1;

          let totalsCount:number = data.queryCartVideoData.totalPrice;
          totalsCount = numberOfItemsCount + totalsCount;

          let videoCartItemDefaultUpdate:VideoCartItems = {
            ...data.queryCartVideoData,
            numberOfItems: numberOfItemsCount,
            totalPrice: totalsCount
          }

          console.log('update quantity of video in cart');
          console.log(numberOfItemsCount);

          this.store.dispatch(invokeUpdateVideoToVideoCartQuantity({ video: videoCartItemDefaultUpdate })); 
          this.addToCartToastTrigger();
        }else{
          console.log('add video to cart');

          //if there is no queryCartVideoData data found, then add a new video to the cart
          this.store.dispatch(invokeAddVideoToVideoCart({ video: videoCartItemDefault })); 
          this.addToCartToastTrigger();
        }
      }
    });

  }

    // selectedAvailableVideo$.subscribe((data) => {
    //   if(data){

        // let videoCartItemDefault:VideoCartItems = {
        //   id: crypto.randomUUID(),
        //   video_id: data.id,
        //   numberOfItems: 1,
        //   totalPrice: data.cost,
        //   video: data // is of type Video, like in interface
        // }

    //     //this part makes it so that if the same item is added to the cart multiple times, the quantity of the existing object is updated instead of another of the same object being added
    //     // queryCartVideoData$.subscribe((data2) => {

    //     //   console.log('data2: ' + data2?.video_id);
    //     //   console.log('data: ' +data.id);

          
    //     // });

    //     // adds to the cart store
    //     this.store.dispatch(invokeAddVideoToVideoCart({ video: videoCartItemDefault })); 


    //     this.addToCartToastTrigger();


        
    //   }
    // });
 

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
