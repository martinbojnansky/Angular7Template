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

  protected setState(nextState: T): void {
    this._state$.next(nextState);
  }
}