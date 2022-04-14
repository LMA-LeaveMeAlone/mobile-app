import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Video } from 'src/app/models/Video';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination } from 'swiper';
import { VideosService } from 'src/app/services/videos.service';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-modal-video',
  templateUrl: './modal-video.page.html',
  styleUrls: ['./modal-video.page.scss'],
})
export class ModalVideoPage {
  @ViewChild('swiper', { static: true }) swiper: SwiperComponent;
  video: Video;
  recommandations: Video[];

  constructor(
    public modalCtrl: ModalController,
    private videosService: VideosService
  ) {
    videosService.getRecords().subscribe((videos: Video[]) => {
      this.recommandations = videos.reverse().filter((video) => video._id != this.video._id);
    });
  }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async openVideo(video: Video) {
    this.closeModal();
    return this.videosService.openVideo(this.modalCtrl, video);
  }
}
