import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Video } from '../models/Video';
import { ModalVideoPage } from '../pages/modal-video/modal-video.page';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  private apiUrl = `http://${environment.serverIp}:${environment.port}/leavemealone/record`;

  constructor(private http: HttpClient) { }

  getRecords(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.apiUrl}`);
  }

  async openVideo(modalCtrl: ModalController, video: Video) {
    const modal = await modalCtrl.create({
      component: ModalVideoPage,
      componentProps: {
        video: video
      }
    });
    return await modal.present()
  }
}
