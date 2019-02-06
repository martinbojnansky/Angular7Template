import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';

export abstract class StoreService<T> {
  state$: Observable<T>;
  private _state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  get state(): T {
    return this._state$.getValue();
  }

  setState(nextState: T): void {
    this._state$.next(nextState);
  }
}

export abstract class Container implements OnInit, OnDestroy {
  private subscriptions: Subscription[];

  ngOnInit(): void {
    this.subscriptions = this.subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  abstract subscribe(): Subscription[];

  protected unsubscribe() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    console.log('unsubscribed ' + this.subscriptions.length);
    this.subscriptions = [];
  }
}
