import { Component, inject } from '@angular/core';
import { SnackbarService } from './snackbar.service';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  template: `
    @if (snackbarService.snackbarState()) {
      <div class="snackbar">
        {{ snackbarService.snackbarState()?.message }}
      </div>
    }
  `,
  styles: [`
    .snackbar {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: #fff;
      padding: 16px;
      border-radius: 4px;
      z-index: 1000;
      min-width: 250px;
      text-align: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      animation: fadein 0.5s;
    }

    @keyframes fadein {
      from {bottom: 0; opacity: 0;}
      to {bottom: 20px; opacity: 1;}
    }
  `]
})
export class SnackbarComponent {
  protected snackbarService = inject(SnackbarService);
}
