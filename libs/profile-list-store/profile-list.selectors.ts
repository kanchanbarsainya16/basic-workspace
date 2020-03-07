import { ProfileListState } from './../feature-profile-grid/models/profile-list-state.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getUserProfileListState = createFeatureSelector<ProfileListState>('profileList');

export const getUserProfileList = createSelector(getUserProfileListState, ({ userProfilesList }) => {

  return userProfilesList;

});
