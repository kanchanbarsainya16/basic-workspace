import { Action, createReducer, on } from '@ngrx/store';
import * as ProfileListActions from './profile-list.actions';
import { ProfileListState } from './../feature-profile-grid/models/profile-list-state.model';


export const initialState: ProfileListState = {
  userProfilesList: []
}

const scoreboardReducer = createReducer(
  initialState,
  on(ProfileListActions.getProfileList, state => {
    // Write code here
    return { ...state }
  }),
  on(ProfileListActions.successGetProfileList, (state: ProfileListState, { payload }) => {
    // Write code here
    return { ...state, userProfilesList: payload }
  })
);

export function ProfileListReducer(state: ProfileListState | undefined, action: Action) {
  return scoreboardReducer(state, action);
}
