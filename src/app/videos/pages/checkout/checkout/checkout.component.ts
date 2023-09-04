import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { CartCountItems, Video } from '../../../store/video';
import { selectCartVideos } from '../../../store/videos.selector';
import { invokeVideoCartFetch } from '../../../store/videos.action';
import { combineLatest, count, first, forkJoin, map, merge, mergeAll, of, reduce, switchMap, take } from 'rxjs';
import { selectUser } from 'src/app/videos/store/login/login.selector';
import { VideosService } from 'src/app/videos/videos.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  constructor(
    private store: Store, 
    private route:ActivatedRoute,
    private router:Router,
    private appStore:Store<Appstate>,
    private videoService:VideosService,
  ){ }

  cartVideos$ = this.store.pipe(select(selectCartVideos)); // select videos from the video cart
  selectUser$ = this.store.pipe(select(selectUser));
  totals$ = of({cartCount:0, cartGrandTotal: 0} as CartCountItems);

  htmlGrandTotal$ = of({value: 0});
  htmlCartCount$ = of({value: 0});
  htmlCardDetails = {
    cardName: 'John Bob McGee',
    creditCardNum: '289971114455222',
    expiration: '2415',
    cvv: '106',
  };


  ngOnInit(): void {

    this.store.dispatch(invokeVideoCartFetch());
    this.updateGrandTotal();
  }

  updateSiteGrandTotal(){
   this.totals$ = this.videoService.updateMainGrandTotal(selectCartVideos);
    
   
  }

  updateGrandTotal(){
    let cartVideosTotalPrice$ = this.store.pipe(select(selectCartVideos));
    
    // each time you use map, you loop down each hierarchy in the object/shape
    let grandTotal$ = cartVideosTotalPrice$.pipe(
      map(videoCart => videoCart.reduce((acc, val) => {
          let sub_total = (Number(val.video.cost) * Number(val.numberOfItems));
          let data:number = Number(acc) + sub_total;
          return data;
        }, 0).toFixed(2) //tofix makes it 2 decimals
      )
    );

    //get cart count
    let cartCount$ = cartVideosTotalPrice$.pipe(map(videoCartItem =>  {
        return videoCartItem.length;
      })
    );

    //action the grand total
    grandTotal$.subscribe((data) => {
      this.htmlGrandTotal$.subscribe((total) => {
        console.log(Number(data));
        return total.value = Number(data);
      })
    });

    //action keep count of cart items
    cartCount$.subscribe((data) => {
      this.htmlCartCount$.subscribe((count) => {
        return count.value = Number(data);
      })
    });

  }

  purchase(){

    combineLatest({
      count: this.htmlCartCount$.pipe(first()),
      grandTotal: this.htmlGrandTotal$.pipe(first()),
      user: this.selectUser$.pipe(first()),
      cart: this.cartVideos$,
    }).subscribe((data) => {

      let getGrandTotal = data.grandTotal.value;

      console.log(getGrandTotal);

      if(data.user.length === 0){
        return alert('You are not logged in. Please log in first before you purchase.');
      }

      if(data.count.value > 0){
        //alert('you have ' + count.value + ' items in your cart');
        
        //parse the cart; for data to be sent


        //transmit the data
        //create order first
        //create transaction; then add order num to tranx
        //clear the state

      }else{
        alert('You have no items in your cart. Please add some before trying to checkout.');
      }

      console.log(this.htmlCardDetails);

    });

  }



}
