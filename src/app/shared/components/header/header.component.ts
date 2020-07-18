import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStore } from '../../../auth/services/auth.store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isActive = false;

  isLoggedIn$: Observable<boolean> = this.authStore.isLoggedIn$;
  isLoggedOut$: Observable<boolean> = this.authStore.isLoggedOut$;

  constructor(private authStore: AuthStore) {}

  ngOnInit(): void {}

  logOut() {
    this.authStore.logout();
  }
}
