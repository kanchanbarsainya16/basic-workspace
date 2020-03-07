import { ProfileListEffects } from './../../../../libs/profile-list-store/profile-list.effects';
import { ProfileEffects } from './../../../../libs/profile-store/profile.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UiModule } from '../../../../libs/ui/src';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { InfoComponent } from './info.component';
import {HttpClientModule} from '@angular/common/http'
import { ProfileListReducer } from 'libs/profile-list-store/profile-list.reducers'
import { RandomUserReducer } from 'libs/profile-store/profile.reducers'



@NgModule({
  declarations: [AppComponent, InfoComponent],
  imports: [
    BrowserModule,
    UiModule,
    MatToolbarModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          pathMatch: 'full',
          component: InfoComponent
        },
        {
          path: 'profile-list',
          pathMatch: 'full',
          loadChildren: () =>
            import('../../../../libs/feature-profile-grid/feature-profile-grid.module').then(
              module => module.FeatureProfileGridModule
            )
        },
        {
          path: 'profile-details',
          pathMatch: 'full',
          loadChildren: () =>
            import('@monofunworkspace/feature-profile-details').then(
              module => module.FeatureProfileDetailsModule
            )
        }
      ],
      { initialNavigation: 'enabled' }
    ),
    StoreModule.forRoot(
      {profileList : ProfileListReducer,
      randomUser: RandomUserReducer},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([ProfileEffects,ProfileListEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
