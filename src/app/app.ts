import { Component, signal } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { SnackbarComponent } from './snackbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SnackbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('dndMarket-ui');
}
