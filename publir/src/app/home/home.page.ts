import { Component } from '@angular/core';
import { NavController} from '@ionic/angular';
import { DisplaySchedulePage } from '../display-schedule/display-schedule.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  

  public map: any = {
    lat: 25.743554,
      lng: -100.309214,
      zoom: 12
  }; 

  public marker: any = {
    lat: 25.710889, 
      lng: -100.310601,
      zoom: 12
  }; 

  constructor(
    public navCtrl: NavController) {
  }

  ionViewDidLoad(){
    console.log('hi')
    this.map = {
      lat: 25.743554,
      lng: -100.309214,
      zoom: 12
    }
  }


  goToSchedule(){
    this.navCtrl.navigateForward('/display-schedule');
  }

  
}
