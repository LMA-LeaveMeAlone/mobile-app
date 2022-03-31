import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggedUser, User } from '../models/User';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { alertController } from '@ionic/core';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `http://${ environment.serverIp }:${ environment.port }/leavemealone/user`;
  alertController = alertController;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  createUser(user: User): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(
      `${this.apiUrl}/register`,
      user
    );
  }

  loginUser(emailOrUserName: string, password: string): Observable<any> {
    return this.http.post<LoggedUser>(
      `${this.apiUrl}/login`,
      { emailOrUserName, password }
    );
  }

  tryConnect(email: string, password: string){
    this.loginUser(email, password).subscribe(
      {
        next:(data) => {
          this.authService.setRefreshToken(data.refreshToken);
          this.authService.setAccessToken(data.accessToken).then(() => this.router.navigate(['/tabs/tab1']));
        },
        error: (err) => {
          console.log(err);
        this.showAlert('Can\'t connect to your account.', err.error);
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
