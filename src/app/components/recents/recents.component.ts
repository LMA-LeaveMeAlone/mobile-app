import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Video } from 'src/app/models/Video';
import { VideosService } from 'src/app/services/videos.service';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination } from 'swiper';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-recents',
  templateUrl: './recents.component.html',
  styleUrls: ['./recents.component.scss'],
})
export class RecentsComponent {
  @ViewChild('swiper', { static: true }) swiper: SwiperComponent;
  @Input() ignoredVideo: Video;
  recommandations: Video[];

  constructor(
    private videosService: VideosService,
    public modalCtrl: ModalController
    ) {
      videosService.getRecords().subscribe((videos: Video[]) => {
        this.recommandations = videos.reverse().filter((video) => video._id != this.ignoredVideo._id);
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
