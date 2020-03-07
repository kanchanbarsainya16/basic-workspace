import { environment } from './../../apps/monorepofun/src/environments/environment';
// Use the random user generator API found here: https://randomuser.me/ to retrieve data for your services.
// Further documentation for implementation can be found here: https://randomuser.me/documentation#format

import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileListService {

  constructor(private httpClient : HttpClient){}

    getUserProfileList(): Observable<any> {
      // Write code here to retrieve a user profile from the random user API

      const url = environment.profileApi;
      const params = new HttpParams().set('results', environment.numOfProfiles)
      .set('inc', 'name,email,picture,cell,phone,location');

      return this.httpClient.get(url, {params : params});
      // return of(true)

  }
}
