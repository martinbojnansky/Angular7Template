export abstract class StorageService implements Storage {
  abstract length: number;
  abstract clear(): void;
  abstract getItem(key: string): string;
  abstract key(index: number): string;
  abstract removeItem(key: string): void;
  abstract setItem(key: string, value: string): void;
}
