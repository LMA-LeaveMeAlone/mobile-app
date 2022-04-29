import { Injectable, OnInit } from '@angular/core';
import {
  Capacitor
} from '@capacitor/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token
} from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class FcmService implements OnInit {

  constructor() {}

  ngOnInit(){
    if (Capacitor.getPlatform() !== 'web') {
      PushNotifications.requestPermissions().then((permission) =>{
        if(permission.receive === 'granted'){
          PushNotifications.register();
        }
      });

      PushNotifications.addListener('registration', (token: Token) =>{
        console.log('Push registration success, token ' + token.value);
      });

      PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) =>{

        console.log('Push received, notification ' + JSON.stringify(notification));
      });

      PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) =>{
        console.log('Push action performed, action ' + JSON.stringify(action));
      });
    }
  }
}
