import { Component } from '@angular/core';
import { Video } from '../store/video';
import { Store, select } from '@ngrx/store';
import { invokeSaveVideoAPI } from '../store/videos.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Router } from '@angular/router';
import { setApiStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  constructor(private store:Store, 
    private appStore:Store<Appstate>,
    private router:Router){}

  videoForm:Video = {
    id: 0,
    video_title: "",
    creator: "",
    description: "",
    length: 0,
    cost: 0
  }

  ngOnInit(): void {

  }

  save(){
    this.store.dispatch(invokeSaveVideoAPI({payload:{...this.videoForm}}));
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

}
