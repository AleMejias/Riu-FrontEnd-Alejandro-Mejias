import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsManagerService implements OnDestroy {
  private readonly _subscriptions$ = new Subject<void>();

  get subscriptions$() {
    return this._subscriptions$.asObservable();
  }

  ngOnDestroy(): void {
    this._subscriptions$.next();
    this._subscriptions$.complete();
  }
}