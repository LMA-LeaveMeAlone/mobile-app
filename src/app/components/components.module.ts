import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentsComponent } from './recents/recents.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [RecentsComponent],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports:[RecentsComponent],
  entryComponents:[RecentsComponent]
})
export class ComponentsModule { }
