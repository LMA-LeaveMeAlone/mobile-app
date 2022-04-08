import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Video } from 'src/app/models/Objects';
import { ModalVideoPage } from '../modal-video/modal-video.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  videos: Video[] =[
    {
      date: "05/12/2002",
      url: "https://s48.notube.io/download.php?token=984e877db95444fd4de69eb3b3b5dc2c",
      message: "Asticot"
    },
    {
      date: "05/12/2002",
      url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      message: "Asticot"
    }
  ];

  constructor(public modalCtrl: ModalController) {}

  async openVideo(video: Video){
    const modal = await this.modalCtrl.create({     
      component: ModalVideoPage,
      componentProps: {
        video: video
      }
    });    
    return await modal.present()
  }
}