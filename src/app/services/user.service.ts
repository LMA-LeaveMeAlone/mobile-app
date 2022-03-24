import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `http://${ environment.serverIp }:${ environment.port }/leavemealone/user`;
  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(
      `${this.apiUrl}/register`,
      user
    );
  }

  loginUser(emailOrUserName: string, password: string): Observable<any> {
    return this.http.post<User>(
      `${this.apiUrl}/login`,
      { emailOrUserName, password }
    );
  }
}
