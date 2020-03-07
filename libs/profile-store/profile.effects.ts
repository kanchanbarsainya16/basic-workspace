import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { FormsService } from './profile.service';

import * as ProfileActions from './profile.actions';
import { Observable, of } from 'rxjs';


@Injectable()
export class ProfileEffects {

  getUserProfileRequest$: Observable<Action> = createEffect((): any =>
    this.actions$.pipe(
      ofType(ProfileActions.getRamdomUser),
      mergeMap(action =>
        this.formService.getUserProfile().pipe(
          map((data: any) => {
            //use reduce operator to format data as per userProfile Object
          const fromattedData =   data.results.reduce((accu, current) => {
              accu.firstName = current.name.first;
              accu.lastName = current.name.last;
              accu.pictureUrl = current.picture.thumbnail;
              accu.city = current.location.city;
              accu.state = current.location.state;
              accu.email =  current.email;
              accu.phone =  current.phone;
              accu.cell =  current.cell;
              return accu;
            }, {});
            console.log("fromattedData", fromattedData);
            return ProfileActions.successGetRandomUser({ payload: fromattedData });
           // return ProfileActions.successGetRandomUser({ payload: data.results[0] });

          }),
          catchError((error: Error) => {
            return of(ProfileActions.errorGetRandomUser(error));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private formService: FormsService
  ) { }
}

// FYI: The response from the API will return an object with different properties than the UserProfile model.
