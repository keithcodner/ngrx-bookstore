import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { Video, VideoCartItems } from '../../store/video';
import { selectCartVideos } from '../../store/videos.selector';
import { invokeVideoCartFetch } from '../../store/videos.action';
import { map, reduce } from 'rxjs';

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
  ){ }

  cartVideos$ = this.store.pipe(select(selectCartVideos)); // select videos from the video cart
  cartVideosTotalPrice$ = this.store.pipe(select(selectCartVideos));

  ngOnInit(): void {

    this.store.dispatch(invokeVideoCartFetch());

    // each time you use map, you loop down each hierarchy
    this.cartVideosTotalPrice$.pipe(
      map(
        (data:VideoCartItems[]) => data.map(
          (value: VideoCartItems) => {
            return value.totalPrice
          })
        )
    ).subscribe((data) => console.log(data));
  }

}
