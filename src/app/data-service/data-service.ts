import { Injectable } from '@angular/core';
import {ApiService} from '../api/api';

@Injectable({
  providedIn: 'root',
})
export class DataService<T> {
  rows: T[] = [];
  cols: string[] = [];

  constructor(
    private readonly _api: ApiService
  ) {

  }

  public getData(endpoint: string): void {
    this._api.get<T[]>(endpoint).subscribe(
      data => {
        this.rows = data;
      }
    )

  }

}
