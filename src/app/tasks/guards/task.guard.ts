import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { MessagesTypes } from 'src/app/shared/components/messages/messages.types.enum';
import { AuthStore } from '../../auth/services/auth.store.service';
import { MessagesService } from '../../shared/components/messages/messages.service';

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(
    private authStore: AuthStore,
    private messageService: MessagesService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authStore.isLoggedIn$.pipe(
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.messageService.showMessage(
            MessagesTypes.INFO,
            'You have to loggin before start working on tasks'
          );
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
