import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { VideosService } from "../videos.service";
import { invokeSaveVideoAPI, invokeVideoAPI, saveVideoAPISuccess, videoFetchAPISuccess } from "./videos.action";
import { Appstate } from "src/app/shared/store/appstate";
import { Store, select } from "@ngrx/store";
import { setApiStatus } from "src/app/shared/store/app.action";
import { selectVideos } from "./videos.selector";

@Injectable()
export class VideosEffects {
    constructor(private actions$:Actions,
        private videoService:VideosService,
        private appStore:Store<Appstate>,
        private store:Store){}

        loadAllVideos$ = createEffect(() => 
            this.actions$.pipe(
                ofType(invokeVideoAPI),
                withLatestFrom(this.store.pipe(select(selectVideos))),
                switchMap(([,videosFromStore]) => {

                    if(videosFromStore.length > 0){
                        return EMPTY;
                    }

                    return this.videoService.get()
                    .pipe(
                        map((data) => videoFetchAPISuccess({allVideos: data}))
                    )
                })

            )
        );

        saveNewVideo$ = createEffect(() =>
                this.actions$.pipe(
                    ofType(invokeSaveVideoAPI),
                    switchMap((action) => {
                        this.appStore.dispatch(setApiStatus({apiStatus: {apiResponseMessage: '', apiStatus: ''}}))
                        return this.videoService
                        .saveVideo(action.payload)
                        .pipe(
                            map((data) => {
                                this.appStore.dispatch(setApiStatus({apiStatus: {apiResponseMessage: '', apiStatus: 'success'}}))
                                return saveVideoAPISuccess({response: data})
                            })
                        )
                    })
                )
        );
}


