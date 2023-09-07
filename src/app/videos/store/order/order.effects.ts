import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { VideosService } from "../../videos.service";

import { Appstate } from "src/app/shared/store/appstate";
import { Store, select } from "@ngrx/store";
import { setApiStatus } from "src/app/shared/store/app.action";
import { invokeSaveOrderAPI, saveOrderAPISuccess } from "./order.action";


// Only needs to be used when returning an api call from an action
@Injectable()
export class OrderEffects {
    constructor(
        private actions$:Actions,
        private videoService:VideosService,
        private appStore:Store<Appstate>,
        private store:Store
    ){}


        saveNewOrder$ = createEffect(() =>
            this.actions$.pipe(
                ofType(invokeSaveOrderAPI),
                switchMap((action) => {
                    this.appStore.dispatch(setApiStatus({apiStatus: {apiResponseMessage: '', apiStatus: ''}}))
                    return this.videoService
                    .saveOrder(action.payload)
                    .pipe(
                        map((data) => {
                            this.appStore.dispatch(setApiStatus({apiStatus: {apiResponseMessage: '', apiStatus: 'success'}}))
                            return saveOrderAPISuccess({response: data})
                        })
                    )
                })
            )
        );

       
}


