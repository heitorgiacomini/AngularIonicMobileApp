import { Component, OnInit } from '@angular/core';
import { GpsService } from './gps.service';
import { Injectable, NgZone } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss'],
})
export class GpsComponent {
  coordinate: any;
  watchCoordinate: any;
  watchId: any;

  constructor(private zone: NgZone) {
    this.requestPermissions();
  }

  async requestPermissions() {
    if(Capacitor.isNativePlatform()){
      const permResult = await Geolocation.requestPermissions();
      console.log('Perm request result: ', permResult);
      if(permResult.location != 'denied'){
        this.watchPosition();
      }
    }else{
      this.watchPosition();
    }
  }

  watchPosition() {
    try {
      this.watchId = Geolocation.watchPosition({
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 0
      }, (position: Position | null, err) => {
        console.log('Watch', position);
        this.zone.run(() => {
          this.watchCoordinate = {
            latitude: position?.coords.latitude,
            longitude: position?.coords.longitude,
          };
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  clearWatch() {
    if (this.watchId != null) {
      Geolocation.clearWatch({ id: this.watchId });
    }
  }
  // position!: any;
  // positionA!: any;

  // constructor(private _gpsService: GpsService) {
  //   this.currentPosition();
  //   this.currentPositionB();
  // }

  // currentPosition() {
  //   this._gpsService.getwatchPosition().then((x) => {
  //       this.position = x;
  //     });
  // }

  // currentPositionB() {
  //   setInterval(() => {
  //     this._gpsService.getwatchPositionA().then((x) => {
  //       this.positionA = x;
  //     });
  //   }, 2000);
  // }




}
