import { Component, OnInit } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { GpsService } from './gps.service';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss'],
})
export class GpsComponent  {

  position!: Position;
  constructor(_gpsService: GpsService) {
    _gpsService.getCurrentPosition().then(
      x =>{
        this.position = x;
      }
    );

   }


}
