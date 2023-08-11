import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectCartVideoById, selectVideoById, selectVideos } from '../store/videos.selector';
import { invokeAddVideoToVideoCart, invokeDeleteVideoAPI, invokeUpdateVideoToVideoCartQuantity, invokeVideoAPI } from '../store/videos.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { ActivatedRoute, Router } from '@angular/router';
import { Video, VideoCartItems } from '../store/video';

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

    let selectedAvailableVideo$ = this.store.pipe(select(selectVideoById(id)));
    let currenAddVideoID:number = 0;

    selectedAvailableVideo$.subscribe((data) => {
      if(data){

        let videoCartItem:VideoCartItems = {
          id: crypto.randomUUID(),
          video_id: data.id,
          numberOfItems: 1,
          totalPrice: data.cost,
          video: data // is of type Video, like in interface
        }

        currenAddVideoID = data.id;

        this.store.dispatch(invokeAddVideoToVideoCart({ video: videoCartItem }))
        this.addToCartToastTrigger();
      }
    });

    let queryCartVideoData$ = this.store.pipe(select(selectCartVideoById(currenAddVideoID)));

    //this part makes it so that if the same item is added to the cart multiple times, the quantity of the existing object is updated instead of another of the same object being added
    queryCartVideoData$.subscribe((data2) => {
      if(data.id == data2?.video.id){
        this.store.dispatch(invokeUpdateVideoToVideoCartQuantity({ video: videoCartItem }))
        this.addToCartToastTrigger();
      }else{
        
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
