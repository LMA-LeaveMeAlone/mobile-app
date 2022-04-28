import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentsComponent } from './recents/recents.component';
import { SwiperModule } from 'swiper/angular';
import { TabTitleComponent } from './tab-title/tab-title.component';

@NgModule({
  declarations: [
    RecentsComponent,
    TabTitleComponent
  ],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports:[
    RecentsComponent,
    TabTitleComponent
  ],
  entryComponents:[
    RecentsComponent,
    TabTitleComponent
  ]
})
export class ComponentsModule { }
