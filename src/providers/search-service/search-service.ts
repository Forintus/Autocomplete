import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the SearchServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchServiceProvider {

  private url: string = '/autocomplete/json';
  private params: HttpParams;

  constructor(public http: HttpClient) {
    console.log('Constructing SearchService Provider');

    this.params = new HttpParams()
      .set('input', 'Dr. Lelykade')
      .set('types', 'address')
      .set('language', 'nl')
      .set('key', 'AIzaSyB7dHzT3pu9SMVY3fy8Ihq1zlU5s8Emrg0');

    // this.http.get(this.url, { params: params })
    // .subscribe((data) => { 
    //   console.log(data);
    // });
  }

  filterPlaces(term: string) {
    console.log('http request', term);

    return this.http
      .get(this.url, { params: this.params })
      .map((data: any) => data.predictions);
  }
}