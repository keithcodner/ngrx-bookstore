import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokeLoginAPI } from 'src/app/videos/store/login/login.action';
import { User } from 'src/app/videos/store/video';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private store:Store, 
    private appStore:Store<Appstate>,
    private router:Router){}

  userLogin = {
    username: "jbond",
    password: "123"
  }

  ngOnInit(): void {}

  login(){
    this.store.dispatch(invokeLoginAPI({payload:{...this.userLogin}})); // save all videos to store

    // let appState$ = this.appStore.pipe(select(selectAppState));
    // appState$.subscribe((data) => {
    //   if(data.apiStatus === 'success'){
    //     this.appStore.dispatch(
    //       setApiStatus({apiStatus: {apiResponseMessage: '', apiStatus: 'success'}})
    //     );
    //     this.router.navigate(['/'])
    //   }
    // });
  
  }

}
