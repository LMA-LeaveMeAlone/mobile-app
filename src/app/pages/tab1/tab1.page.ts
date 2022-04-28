import { Component, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ObjectsService } from 'src/app/services/objects.service';
import { environment } from 'src/environments/environment';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination } from 'swiper';
import { Video } from 'src/app/models/Video';
import { VideosService } from 'src/app/services/videos.service';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('swiper', { static: true }) swiper: SwiperComponent;

  microphoneIsEnabled: boolean = false;
  cameraIsEnabled: boolean = false;
  btnAlarmDisabled = false;

  constructor(
    private objectsService: ObjectsService,
  ) {}

  async toggleLight() {
    await this.objectsService.toggleLight();
  }

  isLighting(): boolean {
    return this.objectsService.objects?.spotlight || false;
  }

  async toggleAlarm() {
    setTimeout(async () => {
      await this.objectsService.toggleAlarm();
      this.btnAlarmDisabled = false;
    }, environment.timeBetweenObjectsActivation)
    this.btnAlarmDisabled = true;
  }

  isAlarming(): boolean {
    return this.objectsService.objects?.alarm || false;
  }
}
