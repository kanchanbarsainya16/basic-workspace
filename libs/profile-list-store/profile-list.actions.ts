// import { ProfileListState } from './../feature-profile-grid/models/profile-list-state.model';
import { createAction, props } from '@ngrx/store';
import { UserProfile } from 'libs/feature-profile-details/src/lib/models';

export const getProfileList = createAction('[Profile Grid Component] Get user profile list request');

export const successGetProfileList = createAction(
  '[Profile Grid Component] - Success get profile list',
  props<{ payload: UserProfile[] }>()
);

export const errorGetProfileList = createAction('[Profile Grid Component] Error', props<Error>());
