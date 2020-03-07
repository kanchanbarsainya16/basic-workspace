import { Action, createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import { ProfileState } from './../feature-profile-details/src/lib/models/profile-state.model';

export const initialState: ProfileState = {
    userProfile: null
}

const randomUser = createReducer(
    initialState,
    on(ProfileActions.getRamdomUser, state => {
        // Write code here
        return { ...state }
    }),
    on(ProfileActions.successGetRandomUser, (state: ProfileState, { payload }) => {
      // Write code here
      console.log(payload)
      return { ...state, userProfile: payload }
    }),
    on(ProfileActions.setSeLectedUserProfileDetail, (state: ProfileState, { payload }) => {
      // Write code here
      console.log(payload)
      return { ...state, userProfile: payload }
    })
  );

  export function RandomUserReducer(state: ProfileState | undefined, action: Action) {
    return randomUser(state, action);
  }
