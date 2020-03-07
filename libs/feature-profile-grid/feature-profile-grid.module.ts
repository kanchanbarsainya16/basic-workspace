import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileGridListComponent } from './profile-grid/profile-grid.component';
import { UiModule } from '@monofunworkspace/ui';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProfileGridListComponent],
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ProfileGridListComponent
      }
    ])
  ]
})
export class FeatureProfileGridModule { }
