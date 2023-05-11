import { Injectable, NgZone } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Geolocation, Position } from '@capacitor/geolocation';
@Injectable({
  providedIn: 'root',
})
export class GpsService {
  coordinate: any;
  watchCoordinate: any;
  watchId: any;

  constructor(private zone: NgZone) { }

  async requestPermissions() {
    const permResult = await Geolocation.requestPermissions();
    console.log('Perm request result: ', permResult);
  }

  getCurrentCoordinate() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      console.log('Plugin geolocation not available');
      return;
    }
    Geolocation.getCurrentPosition().then(data => {
      this.coordinate = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
        accuracy: data.coords.accuracy
      };
    }).catch(err => {
      console.error(err);
    });
    return this.coordinate;
  }

  watchPosition() {
    try {
      this.watchId = Geolocation.watchPosition({}, (position: Position | null, err) => {
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

  public async getCurrentPosition(): Promise<Position> {
    return await Geolocation.getCurrentPosition();
  }

  public async getwatchPosition(): Promise<string> {
    return await Geolocation.watchPosition(
      {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0,
      },
      (position: Position | null, err?: any): void => {
        console.error("getwatchPosition");
        console.log(position);
      }
    );
  }

  public async getwatchPositionA(): Promise<Position | null> {
    let coords: Position | null = null;
    await Geolocation.watchPosition(
      {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0,
      },
      (position: Position | null, err?: any): void => {
        console.warn("getwatchPositionA");
        coords = position;
        console.log(position);
      }
    );
    return coords;
  }
}
