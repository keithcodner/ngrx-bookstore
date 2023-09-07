import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { VideosService } from "../../videos.service";

import { Appstate } from "src/app/shared/store/appstate";
import { Store, select } from "@ngrx/store";
import { setApiStatus } from "src/app/shared/store/app.action";
import { invokeSaveTransactionAPI, saveTransactionAPISuccess } from "./transaction.action";


// Only needs to be used when returning an api call from an action
@Injectable()
export class TransactionEffects {
    constructor(
        private actions$:Actions,
        private videoService:VideosService,
        private appStore:Store<Appstate>,
        private store:Store
    ){}


        saveNewTransaction$ = createEffect(() =>
            this.actions$.pipe(
                ofType(invokeSaveTransactionAPI),
                switchMap((action) => {
                    this.appStore.dispatch(setApiStatus({apiStatus: {apiResponseMessage: '', apiStatus: ''}}))
                    return this.videoService
                    .saveTransaction(action.payload)
                    .pipe(
                        map((data) => {
                            this.appStore.dispatch(setApiStatus({apiStatus: {apiResponseMessage: '', apiStatus: 'success'}}))
                            return saveTransactionAPISuccess({payload: data})
                        })
                    )
                })
            )
        );

       
}


