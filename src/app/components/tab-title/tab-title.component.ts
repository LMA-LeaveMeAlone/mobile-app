import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.scss'],
})
export class TabTitleComponent {
  @Input() title: string;

  constructor(
    private authService: AuthService,
    private objectsService: ObjectsService,
    private router: Router
  ) { }

  async disconnect() {
    await this.authService.deleteAccessToken();
    this.objectsService.stopAutoFetchObjectsState();
    this.router.navigate(['/login'])
  }
}
