import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FcmService } from './services/fcm.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private fcmService: FcmService,
    private auth: AuthService, 
    private router: Router
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.auth.getAccessToken().then((accessToken) => {
      if(accessToken.value){
        this.router.navigate(['/login']);
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Init the notifications receipt
      this.fcmService.initPush();
    });
  }
}
