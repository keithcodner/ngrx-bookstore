import { Component } from '@angular/core';
import { Video } from '../../store/video';
import { Store, select } from '@ngrx/store';
import { selectVideoById } from '../../store/videos.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { invokeUpdateVideoAPI } from '../../store/videos.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setApiStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  constructor(
    private store: Store, 
    private route:ActivatedRoute,
    private router:Router,
    private appStore:Store<Appstate>,
    ){ }

  videoForm:Video = {
    id: 0,
    video_title: "",
    creator: "",
    description: "",
    img_path: "",
    length: 0,
    cost: 0
  }

  ngOnInit(): void {
    let fetchFormData$ = this.route.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'));
        return this.store.pipe(select(selectVideoById(id)));
      })
    )

    fetchFormData$.subscribe((data) => {
      if(data){
        this.videoForm = {...data}
      }else{
        this.router.navigate(['/']);
      }
    })
  }

  update(){
    this.store.dispatch(invokeUpdateVideoAPI({payload: {...this.videoForm}})); // triggers the event to store/update data

    let appState$ = this.appStore.pipe(select(selectAppState)); //selects the app state from the store

    //below is the appstate being tracked
    appState$.subscribe((data) => {
      //console.log(data.apiStatus);
      //this.router.navigate(['/'])
      if(data.apiStatus === 'success'){
        this.appStore.dispatch(
          setApiStatus({apiStatus: {apiResponseMessage: '', apiStatus: ''}})
        );
        this.router.navigate(['/'])
      }
    })
  }

}
