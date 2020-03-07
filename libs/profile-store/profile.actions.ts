import { UserProfile } from './../feature-profile-details/src/lib/models/profile.model';
import { ProfileListState } from './../feature-profile-grid/models/profile-list-state.model';
import { createAction, props } from '@ngrx/store';

export const getRamdomUser = createAction('[Profile Details Component] Get user profile request');

export const successGetRandomUser = createAction(
  '[Profile Details Component] - sucess Get user profile request',
  props<{ payload: UserProfile }>()
);

export const setSeLectedUserProfileDetail = createAction(
  '[Profile Details Component] - sucess Set selected user profile detail',
  props<{ payload: UserProfile }>()
);


export const errorGetRandomUser = createAction('[Profile Details Component] Error', props<Error>());
