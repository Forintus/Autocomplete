import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { SearchServiceProvider } from '../../providers/search-service/search-service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { IonPullUpFooterState } from 'ionic-pullup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  footerState: IonPullUpFooterState;
  searchControl: FormControl;
  items: any[] = [];
  favorites: any[] = [];

  constructor(public navCtrl: NavController, private searchService: SearchServiceProvider) {
    this.footerState = IonPullUpFooterState.Collapsed;
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

  footerExpanded() {
    console.log('Footer expanded!');
  }

  footerCollapsed() {
    console.log('Footer collapsed!');
  }

  toggleFooter() {
    this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }

  makeFavorite(item) {
    this.favorites.push(item);
  }
}