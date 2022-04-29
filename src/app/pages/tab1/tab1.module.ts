import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserModule } from '@angular/platform-browser';

const config: SocketIoConfig = { url:  `http://192.168.43.254:3000`,  options: {}};

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    SwiperModule,
    ComponentsModule,
    SocketIoModule.forRoot(config)
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule { }
