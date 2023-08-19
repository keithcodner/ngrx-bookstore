import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { VideosService } from "../../videos.service";
import { Appstate } from "src/app/shared/store/appstate";
import { Store, select } from "@ngrx/store";
import { setApiStatus } from "src/app/shared/store/app.action";
import { selectVideos } from "./../videos.selector";
import { invokeLoginAPI, loginFetchAPISuccess } from "./login.action";
import { invokeSaveVideoAPI } from "../videos.action";


// Only needs to be used when returning an api call from an action
@Injectable()
export class LoginEffects {
    constructor(
        private actions$:Actions,
        private videoService:VideosService,
        private appStore:Store<Appstate>,
        private store:Store
    ){}

        attemptLogin$ = createEffect(() =>
            this.actions$.pipe(
                ofType(invokeLoginAPI),
                switchMap((action) => {
                    this.appStore.dispatch(setApiStatus({apiStatus: {apiResponseMessage: '', apiStatus: ''}}));
                    return this.videoService
                    .login(action.payload)
                    .pipe(
                        map((data) => {
                            this.appStore.dispatch(setApiStatus({apiStatus: {apiResponseMessage: '', apiStatus: 'success'}}));
                            return loginFetchAPISuccess({payload: data});
                        })
                    );
                })
            )
        );
}


