import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ListContactsService} from '../../service/list-contacts.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-menu-toolbar',
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.scss']
})
export class MenuToolbarComponent implements OnInit {


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onLogout($event) {
    this.authService.logout();
  }
}
