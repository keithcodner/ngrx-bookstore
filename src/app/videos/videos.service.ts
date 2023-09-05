import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartCountItems, Order, Transaction, User, UserLogin, Video, VideoCartItems } from './store/video';
import { combineLatest, count, first, forkJoin, map, merge, mergeAll, Observable, of, reduce, switchMap, take } from 'rxjs';
import { selectCartVideos } from './store/videos.selector';
import { invokeVideoCartFetch } from './store/videos.action';
import { Store, select, MemoizedSelector, DefaultProjectorFn } from '@ngrx/store';
import { selectUser } from './store/login/login.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { Appstate } from '../shared/store/appstate';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(
    private store:Store, 
    private http:HttpClient,
    private route:ActivatedRoute,
    private router:Router,
    private appStore:Store<Appstate>,
  ) { }

  //----------------------  Home Endpoints ----------------------
  get(){
    return this.http.get<Video[]>("http://localhost:3000/videos");
  }

  saveVideo(payload:Video){
    return this.http.post<Video>("http://localhost:3000/videos", payload);
  }

  update(payload:Video){
    return this.http.put<Video>(`http://localhost:3000/videos/${payload.id}`, payload);
  }

  delete(id:number){
    return this.http.delete(`http://localhost:3000/videos/${id}`);
  }

  //---------------------- Auth End points ----------------------
  login(payload:UserLogin){
    return this.http.post<User>(`http://localhost:3000/auth`, payload);
  }

  //---------------------- Cart End points ----------------------

  //---------------------- Checkout Endpoints ----------------------

  //---------------------- Checkout Endpoints ----------------------
  getAllTransaction(){
    return this.http.get<Transaction[]>("http://localhost:3000/transaction");
  }

  getTransactionsById(id:any){
    return this.http.post<Transaction[]>(`http://localhost:3000/transactionById/`, id);
  }

  saveTransaction(payload:Video){
    return this.http.post<Video>("http://localhost:3000/transaction", payload);
  }

  //---------------------- Order Endpoints ----------------------
  getAllOrder(){
    return this.http.get<Order[]>("http://localhost:3000/order");
  }

  getOrderById(id:any){
    return this.http.post<Order[]>("http://localhost:3000/orderById", id);
  }

  saveOrder(payload:Order){
    return this.http.post<Order>("http://localhost:3000/order", payload);
  }

  //---------------------- Functions----------------------
  //after the function colon, is the function type, and its the type of whats (and must match) returned ...which is an observable of type cartcountitems
  updateMainGrandTotal(
    selectCartVideos:MemoizedSelector<object, VideoCartItems[], DefaultProjectorFn<VideoCartItems[]>> 
  ):Observable<CartCountItems>{
    let cartVideosTotalPrice$ = this.store.pipe(select(selectCartVideos));
    let cartCountItem: CartCountItems = {
      cartCount: 0,
      cartGrandTotal:0,
    };

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
      cartCountItem.cartGrandTotal = Number(data);
    });

    //action keep count of cart items
    cartCount$.subscribe((data) => {
      cartCountItem.cartCount = Number(data);
    });
    
    return of(cartCountItem);

  }


}
