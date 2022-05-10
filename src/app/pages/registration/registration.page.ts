import { Component, OnInit } from '@angular/core';
import { LoginUser, RegisterUser, User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { alertController } from '@ionic/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {
  userName: string;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  digitalKey: string;
  ip: string;

  alertController = alertController;

  constructor(
    private userService: UserService
  ) {}

  async ngOnInit(){
    this.ip = await this.userService.loadIp();
  }

  submit(){
    if (!this.userName || !this.firstName || !this.lastName || !this.email || !this.password || !this.digitalKey || !this.ip){
      this.showAlert('Champs incomplets', 'Veuillez remplir tous les champs d\'inscription !');
    }
    else{
      const user: RegisterUser = {
        user: {
          userName: this.userName,
          lastName: this.lastName,
          firstName: this.firstName,
          email: this.email,
          password: this.password
        },
        digitalKey: this.digitalKey
      };
      this.userService.saveIp(this.ip);
      this.userService.createUser(user).subscribe((result: LoginUser) => {
        this.showAlert('Votre compte a été créé', `Bonjour ${result.user.userName}, vous pouvez désormais vous connecter.`)
        .then(() => {
          this.userService.tryConnect(result.user.email, this.password);
        });
      },
      (err) => {
        this.showAlert('Impossible de créer votre compte', err.error);
      }
      );
    }
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
