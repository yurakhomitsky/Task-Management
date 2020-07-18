import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.show()),
      concatMap(() => obs$),
      finalize(() => this.hide())
    );
  }

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    setTimeout(() => this.loadingSubject.next(false), 500);
  }
}
