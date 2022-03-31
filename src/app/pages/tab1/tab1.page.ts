import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isLighting: boolean = false;
  microphoneIsEnabled: boolean = false;
  cameraIsEnabled: boolean = false;

  constructor(
    private authService: AuthService,
    private objectsService: ObjectsService,
    private router: Router
  ) {}

  async disconnect(){
    await this.authService.deleteAccessToken();
    this.objectsService.stopAutoFetchObjectsState();
    this.router.navigate(['/login'])
  }

  async toggleLight(){
    await this.objectsService.toggleLight();
    //this.isLighting = !this.isLighting;
  }
}
