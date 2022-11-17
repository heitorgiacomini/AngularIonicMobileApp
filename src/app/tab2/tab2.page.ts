import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { IUserPhoto } from '../services/IUserPhoto';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public _photoService: PhotoService,
    public _actionSheetController: ActionSheetController) {}

  async ngOnInit() {
    await this._photoService.loadSaved();
  }

  addPhotoToGallery() {
    this._photoService.addNewToGallery();
  }
  public async showActionSheet(photo: IUserPhoto, position: number) {
    const actionSheet = await this._actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this._photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }

}
