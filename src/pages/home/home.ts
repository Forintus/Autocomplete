import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Toast } from 'ionic-angular/components/toast/toast';
import { SearchServiceProvider } from '../../providers/search-service/search-service';
import { ConnectivityProvider } from '../../providers/connectivity/connectivity';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private searchControl: FormControl;
  private items: any[] = [];
  private favorites: any[] = [];
  private toastInstance: Toast;

  constructor(public navCtrl: NavController, private searchService: SearchServiceProvider,
    public connectivity: ConnectivityProvider, private toastCtrl: ToastController) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {

    let msg: string = this.connectivity.isOnline() ? "We are online" : "Please make sure you are online";

    this.presentToast(msg);

    this.addConnectivityListeners();

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

    let index = this.favorites.findIndex(favorite => favorite.place_id === item.place_id);

    if (index < 0) {
      this.searchService.getPlaceDetails(item.place_id)
        .subscribe((data: any) => {

          this.favorites.push(data);
          this.items = [];
          this.items.length = 0;
          this.searchControl.reset();
          this.showGeocode(data);
        });
    }
  }

  removeFromFavorites(favorite: any) {

    let index = this.favorites.indexOf(favorite);

    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  showGeocode(favorite: any) {
    console.log(favorite.geometry.location);
  }

  addConnectivityListeners() {

    window.ononline = () => {
      console.log("online");
      this.presentToast('You\'re back online')
    }

    window.onoffline = () => {
      console.log("offline");
      this.presentToast('You\'re offline')
    }
  }

  presentToast(msg: string) {

    if (this.toastInstance) {
      return;
    }

    this.toastInstance = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });

    this.toastInstance.onDidDismiss(() => {
      this.toastInstance = null;
      console.log('Dismissed toast');
    });

    this.toastInstance.present();
  }
}