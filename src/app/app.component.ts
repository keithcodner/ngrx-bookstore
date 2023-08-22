import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { first, map, of, reduce, take } from 'rxjs';
import { invokeUserDetailsFetchAPI } from './videos/store/login/login.action';
import { selectUser } from './videos/store/login/login.selector';
import { User } from './videos/store/video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngrx-bookstore';

  constructor(
    private store: Store, 
    private route:ActivatedRoute,
    private router:Router,
    private appStore:Store<Appstate>,
  ){ }

  user$ = of({value: ""});
  

  ngOnInit(): void {
    this.store.dispatch(invokeUserDetailsFetchAPI()); //first user call

    let loggedInUser$ = this.store.pipe(select(selectUser));

    this.user$.subscribe((data) => {
      loggedInUser$.subscribe((fu) => {
        if(fu || fu != null){
            fu.map((user) => {
              console.log(user.name)
              return data.value =  'Welcome, '+user.name+' <----';
            }) 
        }
      })
    });

  }
}
