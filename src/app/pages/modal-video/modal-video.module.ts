import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalVideoPageRoutingModule } from './modal-video-routing.module';
import { ModalVideoPage } from './modal-video.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalVideoPageRoutingModule,
    SwiperModule
  ],
  declarations: [ModalVideoPage]
})
export class ModalVideoPageModule { }
