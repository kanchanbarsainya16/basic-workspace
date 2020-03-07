import { UserProfile } from 'libs/feature-profile-details/src/lib/models';

export interface ProfileListState {
    userProfilesList: Array<UserProfile>;
    error?:any
}
