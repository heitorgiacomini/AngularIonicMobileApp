import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public _photoService: PhotoService) {}

  async ngOnInit() {
    await this._photoService.loadSaved();
  }

  addPhotoToGallery() {
    this._photoService.addNewToGallery();
  }
}
