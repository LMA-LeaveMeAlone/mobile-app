import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Video } from 'src/app/models/Video';

@Component({
  selector: 'app-modal-video',
  templateUrl: './modal-video.page.html',
  styleUrls: ['./modal-video.page.scss'],
})
export class ModalVideoPage {
  video: Video;

  constructor(
    public modalCtrl: ModalController
  ) {}

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
