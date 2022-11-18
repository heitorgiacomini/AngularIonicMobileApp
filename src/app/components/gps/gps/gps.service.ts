import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
@Injectable({
  providedIn: 'root'
})
export class GpsService {

  constructor() { }


  public async getCurrentPosition() : Promise<Position>{
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates;
  };



}
