import { Profile } from 'libs/feature-profile-details/src/lib/models/profile.model';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as ProfileListActions from './profile-list.actions';

import { ProfileListService } from './profile-list.service';


@Injectable()
export class ProfileListEffects {
  getUserProfileListRequest$: Observable<Action> = createEffect((): any =>
    this.actions$.pipe(
      ofType(ProfileListActions.getProfileList),
      mergeMap(action =>
        this.profileListService.getUserProfileList().pipe(
          // map((data: any) => new ProfileListActions.successGetProfileList({ payload: data.results}),
          map((data: any) => {
            console.log('data results', data.results)
            const formattedList = data.results.map(profile => new Profile(profile))

           // console.log("*******formmated list*******", formattedList)
            return ProfileListActions.successGetProfileList({ payload: formattedList });

           // return ProfileListActions.successGetProfileList({ payload: data.results });
          }),
          catchError((error: Error) => {
            return of(ProfileListActions.errorGetProfileList(error));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private profileListService: ProfileListService
  ) { }
}

// FYI: The response from the API will return an object with different properties than the UserProfile model.
