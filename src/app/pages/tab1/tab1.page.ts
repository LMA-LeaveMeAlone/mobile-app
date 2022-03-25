import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isLighting: boolean = false;
  microphoneIsEnabled: boolean = false;
  cameraIsEnabled: boolean = false;

  constructor() {}
}
