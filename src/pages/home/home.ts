import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { SearchServiceProvider } from '../../providers/search-service/search-service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchControl: FormControl;
  items: any;

  constructor(public navCtrl: NavController, private searchService: SearchServiceProvider) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {

    this.searchControl.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe((input: string) => {
        this.setFilteredItems(input);
      });
  }

  setFilteredItems(input: string) {

    this.searchService.filterPlaces(input)
      .subscribe((data: any[]) => {
        this.items = data;
      });
  }
}