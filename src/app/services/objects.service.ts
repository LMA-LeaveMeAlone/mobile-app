import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Objects } from '../models/Objects';
import { environment } from 'src/environments/environment';
import { interval, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {
  private apiUrl = `http://${ environment.serverIp }:${ environment.port }/leavemealone/object`;

  autoFetch: Subscription;
  objects: Objects;

  constructor(private http: HttpClient) { }

  autoFetchObjectsState(){
    this.fetchObjectsState();

    this.autoFetch = interval(environment.timeBetweenFetchObjectsState).subscribe(() => {
      this.fetchObjectsState()
    });
  }

  fetchObjectsState(){
    this.getObjectsState().subscribe((objects: Objects) => {
      this.objects = objects;
    });
  }

  getObjectsState(): Observable<Objects>{
    return this.http.get<Objects>(`${this.apiUrl}`);
  }
}
