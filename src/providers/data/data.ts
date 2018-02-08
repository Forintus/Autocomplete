import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Constructing Data Provider');
  }

  getRecent(): Promise<any> {
    // Or to get a key/value pair
    return this.storage.get('recent');
  }

  setRecent(json) {
    // set a key/value
    this.storage.set('recent', json);
  }
}