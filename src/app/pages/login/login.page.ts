/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  emailOrUserName: string;
  password: string;

  constructor(
    private userService: UserService
    ) { }

  ngOnInit() {
  }

  submit(){
    if (!this.emailOrUserName || !this.password){
      this.userService.showAlert('Can\'t validate', 'Please provide all required data.');
      return;
    }
    this.userService.tryConnect(this.emailOrUserName, this.password);
  }
}
