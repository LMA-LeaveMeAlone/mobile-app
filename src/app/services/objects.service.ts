import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { interval, Observable, Subscription } from 'rxjs';
import { Objects } from '../models/Objects';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {
  private apiUrl = `:${environment.port}/leavemealone/object`;

  autoFetch: Subscription;
  objects: Objects;

  constructor(private http: HttpClient) { }

  autoFetchObjectsState() {
    this.fetchObjectsState();

    this.autoFetch = interval(environment.timeBetweenFetchObjectsState).subscribe(() => {
      this.fetchObjectsState()
    });
  }

  stopAutoFetchObjectsState() {
    this.autoFetch.unsubscribe();
  }

  fetchObjectsState() {
    this.getObjectsState().subscribe((objects: Objects) => {
      this.objects = objects;
    });
  }

  getObjectsState(): Observable<Objects> {
    return this.http.get<Objects>(`http://${ environment.serverIp }${this.apiUrl}`);
  }

  toggleLight() {
    this.http.put<Objects>(`http://${ environment.serverIp }${this.apiUrl}/spotlight/toggle`, {}).subscribe((result) => {
      this.objects.spotlight = result.spotlight;
    });
  }

  toggleAlarm() {
    this.http.put<Objects>(`http://${ environment.serverIp }${this.apiUrl}/alarm/toggle`, {}).subscribe((result) => this.objects.alarm = result.alarm);
  }
}
