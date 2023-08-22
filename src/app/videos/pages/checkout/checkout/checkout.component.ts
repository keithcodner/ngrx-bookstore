import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { Video } from '../../../store/video';
import { selectCartVideos } from '../../../store/videos.selector';
import { invokeVideoCartFetch } from '../../../store/videos.action';
import { of } from 'rxjs';

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
  ){ }

  cartVideos$ = this.store.pipe(select(selectCartVideos)); // select videos from the video cart
  htmlGrandTotal$ = of({value: 0});


  ngOnInit(): void {

    this.store.dispatch(invokeVideoCartFetch());
  }



}
