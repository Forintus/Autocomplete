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
  items: any[] = [];
  favorites: any[] = [];
  // showList: boolean = false;

  constructor(public navCtrl: NavController, private searchService: SearchServiceProvider) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {

    this.searchControl.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe((input: string) => {
        if (input && input.trim() != '') {
          this.setFilteredItems(input);
        }
      });
  }

  setFilteredItems(input: string) {

    this.searchService.filterPlaces(input)
      .subscribe((data: any[]) => {
        this.items = data;
      });
  }

  addToFavorites(item: any) {

    this.searchService.getPlaceDetails(item.place_id)
      .subscribe((data: any) => {

        this.favorites.push(data);
        this.items = [];
        this.items.length = 0;
        this.searchControl.reset();
      });
  }

  removeFromFavorites(favorite: any) {
    // console.log(favorite);

    let index = this.favorites.indexOf(favorite);

    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  showGeocode(favorite: any) {
    console.log(favorite.geometry.location);
  }
}