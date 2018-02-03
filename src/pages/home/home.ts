import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchServiceProvider } from '../../providers/search-service/search-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private serachService: SearchServiceProvider ) {

  }

}
