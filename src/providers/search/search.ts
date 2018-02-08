import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the SearchServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchProvider {

  private autoComplete: string = '/autocomplete/json';
  private detailsUrl: string = '/details/json';

  constructor(public http: HttpClient) {
    console.log('Constructing SearchService Provider');
  }

  filterPlaces(input: string) {

    // params need to be set in 1 call
    let params: HttpParams = new HttpParams()
      .set('input', input)
      // .set('offset', '3') // This screwes it up
      .set('types', 'geocode')
      .set('components', 'country:nl')
      .set('language', 'nl')
      .set('key', 'AIzaSyB7dHzT3pu9SMVY3fy8Ihq1zlU5s8Emrg0');

    return this.http
      .get(this.autoComplete, { params: params })
      .map((data: any) => data.predictions);
  }

  getPlaceDetails(placeid: string) {
        // params need to be set in 1 call
        let params: HttpParams = new HttpParams()
        .set('placeid', placeid)
        // .set('offset', '3') // This screwes it up
        // .set('types', 'geocode')
        // .set('components', 'country:nl')
        // .set('language', 'nl')
        .set('key', 'AIzaSyB7dHzT3pu9SMVY3fy8Ihq1zlU5s8Emrg0');
  
      return this.http
        .get(this.detailsUrl, { params: params })
        .map((data: any) => data.result);
  }
}