import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

@Injectable()
export class LocalStorageService implements StorageService {
  length: number;
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
    this.updateLength();
  }

  clear(): void {
    this.storage.clear();
    this.updateLength();
  }

  getItem(key: string): string {
    return this.storage.getItem(key);
  }

  key(index: number): string {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
    this.updateLength();
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
    this.updateLength();
  }

  private updateLength() {
    this.length = localStorage.length;
  }
}
