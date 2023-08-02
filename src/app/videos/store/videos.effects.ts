import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { VideosService } from "../videos.service";
import { invokeVideoAPI, videoFetchAPISuccess } from "./videos.action";

@Injectable()
export class VideosEffects {
    constructor(private actions$:Actions,
        private bookService:VideosService){}

        loadAllVideos$ = createEffect(() => 
            this.actions$.pipe(
                ofType(invokeVideoAPI),
                switchMap(() => {
                    return this.bookService.get()
                    .pipe(
                        map((data) => videoFetchAPISuccess({allVideos: data}))
                    )
                })

            )
        );
}


