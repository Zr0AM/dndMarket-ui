import { Injectable, signal } from '@angular/core';

export interface SnackbarState {
  message: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private timeoutId: any;
  readonly snackbarState = signal<SnackbarState | null>(null);

  show(message: string, duration: number = 5000) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.snackbarState.set({ message, duration });

    if (duration > 0) {
      this.timeoutId = setTimeout(() => {
        this.snackbarState.set(null);
        this.timeoutId = null;
      }, duration);
    }
  }

  hide() {
    if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
    }
    this.snackbarState.set(null);
  }
}
