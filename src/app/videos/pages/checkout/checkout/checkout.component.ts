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

  htmlCardDetails = {
    cardName: 'John Bob McGee',
    creditCardNum: '289971114455222',
    expiration: '2415',
    cvv: '106',
  };


  ngOnInit(): void {

    this.store.dispatch(invokeVideoCartFetch());
    this.updateSiteGrandTotal();
  }

  updateSiteGrandTotal(){
   this.totals$ = this.videoService.updateMainGrandTotal(selectCartVideos);
    
   console.log(this.totals$);
  }

  

  purchase(){

    combineLatest({
      count: this.totals$.pipe(first()),
      user: this.selectUser$.pipe(first()),
      cart: this.cartVideos$,
    }).subscribe((data) => {

      let getGrandTotal = data.count.cartGrandTotal;

      console.log(getGrandTotal);

      if(data.user.length === 0){
        return alert('You are not logged in. Please log in first before you purchase.');
      }

      if(data.count.cartCount > 0){
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
