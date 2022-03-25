import { Component, OnInit } from '@angular/core';
import { LoggedUser, User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { alertController } from '@ionic/core';

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
  alertController = alertController;

  constructor(
    private userService: UserService,
    private router: Router,
    ) { }

  ngOnInit() {
  }
  submit(){
    if (!this.userName || !this.firstName || !this.lastName || !this.email || !this.password || !this.digitalKey){
      this.showAlert('Champs incomplets', 'Veuillez remplir tous les champs d\'inscription !');
    }
    else{
      console.log("1 " + this.password);
      const user: User = {
        userName: this.userName,
        lastName: this.lastName,
        firstName: this.firstName,
        email: this.email,
        password: this.password,
        digitalKey: this.digitalKey
      };
      this.userService.createUser(user).subscribe((result: LoggedUser) => {
        this.showAlert('Votre compte a été créé', `Bonjour ${result.user.userName}, vous pouvez désormais vous connecter.`)
        .then(() => {
          // TODO : Save access token key to storage : result.accessToken
          this.userService.tryConnect(result.user.email, this.password);
        });
      },
      (err) => {
        this.showAlert('Can\'t create your account', err.error);
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
