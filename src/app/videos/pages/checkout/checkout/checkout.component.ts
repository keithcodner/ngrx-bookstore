import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { CartCountItems, Order, Video } from '../../../store/video';
import { selectCartVideos } from '../../../store/videos.selector';
import { invokeVideoCartFetch } from '../../../store/videos.action';
import { combineLatest, count, first, forkJoin, map, merge, mergeAll, of, reduce, switchMap, take } from 'rxjs';
import { selectUser } from 'src/app/videos/store/login/login.selector';
import { VideosService } from 'src/app/videos/videos.service';
import { invokeSaveOrderAPI } from 'src/app/videos/store/order/order.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setApiStatus } from 'src/app/shared/store/app.action';

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

  cartOrder:Order = {
    user_id: 0,
    order_num: "",
    details: "",
    total: 0,
    createdAt: new Date,
    updatedAt: new Date,
  }

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

  saveOrder(){
    this.store.dispatch(invokeSaveOrderAPI({payload:{...this.cartOrder}})); // save all videos to store

    let appState$ = this.appStore.pipe(select(selectAppState));
    appState$.subscribe((data) => {
      if(data.apiStatus === 'success'){
        this.appStore.dispatch(
          setApiStatus({apiStatus: {apiResponseMessage: '', apiStatus: 'success'}})
        );
        this.router.navigate(['/'])
      }
    })
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

        let order_id = crypto.randomUUID();
        
        //create order first
        this.cartOrder.user_id = data.user[0].id;
        this.cartOrder.order_num = order_id;
        this.cartOrder.details = "this is an order for " + data.user[0].name;
        this.cartOrder.total = data.count.cartGrandTotal;

        //save order
        this.saveOrder();

        console.log('order was submitted!');

        //parse the cart and record transactions
        data.cart.forEach(el => {
          console.log(el.totalPrice);
        });

        //create transaction; then add order num to tranx
        //clear the state

      }else{
        alert('You have no items in your cart. Please add some before trying to checkout.');
      }

      console.log(this.htmlCardDetails);

    });

  }



}
