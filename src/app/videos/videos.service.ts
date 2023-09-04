import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, Transaction, User, UserLogin, Video } from './store/video';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private http:HttpClient) { }

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

  getOrderById(id:number){
    return this.http.post<Order[]>("http://localhost:3000/orderById", id);
  }

  saveOrder(payload:Order){
    return this.http.post<Order>("http://localhost:3000/order", payload);
  }

  //---------------------- Functions----------------------
}
