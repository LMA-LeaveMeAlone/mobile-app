import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser, RegisterUser } from '../models/User';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { alertController } from '@ionic/core';
import { ObjectsService } from './objects.service';
import { Storage } from '@capacitor/storage';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `:${ environment.port }/leavemealone/user`;
  alertController = alertController;
  static ip: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private objectsService: ObjectsService,
    private router: Router
  ) { }

  static saveIp(ipAddress: string){
    UserService.ip = ipAddress;
    return Storage.set({key:'ip', value: UserService.ip});
  }

  static getIp(){
    Storage.get({key:'ip'}).then((result) => {
      UserService.ip = result.value;
      return UserService.ip ? UserService.ip : '';
    });
  }

  createUser(user: RegisterUser): Observable<LoginUser> {
    return this.http.post<LoginUser>(
      `http://${ environment.serverIp }${this.apiUrl}/register`,
      user
    );
  }

  loginUser(emailOrUserName: string, password: string): Observable<any> {
    return this.http.post<LoginUser>(
      `http://${ environment.serverIp }${this.apiUrl}/login`,
      { emailOrUserName, password }
    );
  }

  tryConnect(email: string, password: string){
    this.loginUser(email, password).subscribe(
      {
        next:(data) => {
          this.authService.setAccessToken(data.accessToken).then(() => {
            // Begin objects state auto fetch
            this.objectsService.autoFetchObjectsState();

            this.router.navigate(['/tabs/tab1'])
          });
        },
        error: (err) => {
          console.log(err);
          this.showAlert('Can\'t connect to your account.', 'La connexion au wifi a échoué');
      }
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
    await alert.onDidDismiss();
  }
}
