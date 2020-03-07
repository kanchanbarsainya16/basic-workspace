import { UserProfile } from './../models/profile.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ProfileActions from '../../../../profile-store/profile.actions';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProfileListState } from 'libs/feature-profile-grid/models/profile-list-state.model';
import { map, takeLast } from 'rxjs/operators';
import { ProfileState } from '../models/profile-state.model';

@Component({
  selector: 'monofunworkspace-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {

  UserProfile$: Observable<ProfileState>
  userprofileSubscription: Subscription;
  userProfile: UserProfile;
  userIndex: number;

  constructor(private store: Store<any>,
    private activatedroute: ActivatedRoute) {
    this.userIndex = this.activatedroute.snapshot.queryParams.id;

    //if query param is not present in the, get random user profile
    if (!this.userIndex) {
      this.store.dispatch(ProfileActions.getRamdomUser());
    }

  }

  ngOnInit() {
      this.UserProfile$ = this.store.pipe(select('randomUser'));
      this.userprofileSubscription = this.UserProfile$
        .pipe(
          map(randomUserState => {
            this.userProfile = randomUserState.userProfile;
            console.log(this.userProfile)

          })
        )
        .subscribe();
  }
  ngOnDestroy(){
    this.userprofileSubscription.unsubscribe();
  }
}
