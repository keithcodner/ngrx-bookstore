import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
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

  user = {
    username: "",
    password: ""
  }

  ngOnInit(): void {

  }

  login(){
  
  }

}
