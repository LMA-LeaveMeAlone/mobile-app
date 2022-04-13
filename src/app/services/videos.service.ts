import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Video } from '../models/Video';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  private apiUrl = `http://${environment.serverIp}:${environment.port}/leavemealone/record`;

  constructor(private http: HttpClient) { }

  getRecords(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.apiUrl}`);
  }
}
