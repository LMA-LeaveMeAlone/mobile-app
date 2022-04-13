import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Video } from 'src/app/models/Video';
import { ModalVideoPage } from '../modal-video/modal-video.page';
import { VideosService } from '../../services/videos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  videos: Video[];

  constructor(
    public modalCtrl: ModalController,
    private videosService: VideosService
  ) {
    videosService.getRecords().subscribe((videos: Video[]) => {
      this.videos = videos.reverse();
    });
  }

  async openVideo(video: Video) {
    return this.videosService.openVideo(this.modalCtrl, video);
  }
}