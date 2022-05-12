import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ObjectsService } from 'src/app/services/objects.service';
import { environment } from 'src/environments/environment';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination } from 'swiper';
import { Socket } from 'ngx-socket-io';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy{
  @ViewChild('swiper', { static: true }) swiper: SwiperComponent;

  microphoneIsEnabled: boolean = false;
  cameraIsEnabled: boolean = false;
  btnAlarmDisabled = false;
  dataBuffer: string;

  constructor(
    private objectsService: ObjectsService,
    private socket: Socket
  ) {}

  ngOnDestroy(): void {
    this.socket.disconnect();
  }

  ngOnInit(){
    this.onLiveStream();
  }

  onLiveStream(){
    this.socket.on('liveStream', (data) =>{
      this.dataBuffer = 'data:image/jpeg;base64,' + data.buffer;
    });
  }

  enableCamera(){
    this.cameraIsEnabled ? this.socket.disconnect() : this.socket.connect() && this.socket.emit('start-stream');
    this.cameraIsEnabled = !this.cameraIsEnabled;
  }

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
