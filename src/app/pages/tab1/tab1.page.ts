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
  microphoneIsEnabled: boolean = false;
  cameraIsEnabled: boolean = false;
  btnAlarmDisabled = false;

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
  }

  isLighting(): boolean{
    return this.objectsService.objects?.spotlight || false;
  }

  async toggleAlarm(){
    setTimeout(async ()=>{ 
      await this.objectsService.toggleAlarm();
      this.btnAlarmDisabled = false;
    }, 800)
    this.btnAlarmDisabled = true;
  }

  isAlarming(): boolean{
    return this.objectsService.objects?.alarm || false;
  }
}
