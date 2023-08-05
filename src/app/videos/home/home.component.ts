import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectVideos } from '../store/videos.selector';
import { invokeDeleteVideoAPI, invokeVideoAPI } from '../store/videos.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { ActivatedRoute, Router } from '@angular/router';

declare var window:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private store:Store,
    private appStore:Store<Appstate>,
    private route:ActivatedRoute,
    private router:Router,
    ){}

  videos$ = this.store.pipe(select(selectVideos));

  deleteModal:any;
  idToDelete:number = 0;
  
  ngOnInit(): void{

    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById("deleteModal")
    );

    this.store.dispatch(invokeVideoAPI());
  }

  openDeleteModal(id:number){
    this.idToDelete = id;
    this.deleteModal.show();
  }

  closeDeleteModal(){
    this.deleteModal.hide();
  }

  confirmDelete(){
    this.store.dispatch(invokeDeleteVideoAPI({id: this.idToDelete}))

    let appState$ = this.appStore.pipe(select(selectAppState));
    appState$.subscribe((data) => {
      //console.log(data.apiStatus);
      //this.router.navigate(['/'])
      if(data.apiStatus === 'success'){
        this.appStore.dispatch(
          setApiStatus({apiStatus: {apiResponseMessage: '', apiStatus: ''}})
        );
        this.closeDeleteModal();
      }
    })
  }
}
