import { map, takeLast } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ProfileListAction from '../../profile-list-store/profile-list.actions'
import { ProfileListState } from '../models/profile-list-state.model';
import { UserProfile } from 'libs/feature-profile-details/src/lib/models';
import { Router } from '@angular/router';
import * as ProfileActions from '../../profile-store/profile.actions'


@Component({
  selector: 'app-profile-list-grid',
  templateUrl: './profile-grid.component.html',
  styleUrls: ['./profile-grid.component.css']
})
export class ProfileGridListComponent implements OnInit, OnDestroy {
  profileList$: Observable<ProfileListState>;
  profileListSubscription: Subscription;
  profileList: Array<UserProfile>

  constructor(
    private store: Store<{ profileList: ProfileListState }>,
    private route: Router) {
    this.store.dispatch(ProfileListAction.getProfileList());

  }

  ngOnInit(): void {
    this.profileList$ = this.store.pipe(select('profileList'));
    this.profileListSubscription = this.profileList$
      .pipe(
        map(profileListState => {
          this.profileList = profileListState.userProfilesList
        })
      )
      .subscribe();
  }

  onUserSelection(profileIndex){
    console.log("id from child component", profileIndex);

    // On user selection, dispatching an action to set the state of userProfile
    this.store.dispatch(ProfileActions.setSeLectedUserProfileDetail({payload: this.profileList[profileIndex]}));

    //using option query param  userIndex  from profileList array as id
    this.route.navigate(['profile-details'], { queryParams: { id: profileIndex } });
  }

  ngOnDestroy(){
    this.profileListSubscription.unsubscribe();
  }
}
