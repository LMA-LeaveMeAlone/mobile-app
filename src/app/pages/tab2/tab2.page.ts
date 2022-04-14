import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Video } from 'src/app/models/Video';
import { ModalVideoPage } from '../modal-video/modal-video.page';
import { VideosService } from '../../services/videos.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  data: any;
  videos: Video[];
  glowIndex: number;

  constructor(
    private route: ActivatedRoute,
    public modalCtrl: ModalController,
    private videosService: VideosService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.videos && params.glowIndex) {
        this.videos = JSON.parse(params.videos);
        this.glowIndex = JSON.parse(params.glowIndex);
      }
      else {
        this.glowIndex = null;
        videosService.getRecords().subscribe((videos: Video[]) => {
          this.videos = videos.reverse();
        });
      }
    });
  }

  /*ionViewWillEnter() {

  }*/

  async openVideo(video: Video) {
    return this.videosService.openVideo(this.modalCtrl, video);
  }
}