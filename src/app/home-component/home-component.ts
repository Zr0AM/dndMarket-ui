import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api/api';
import { ItemModel } from '../../models/item.model';
import { environment } from '../../environments/environment';
import { GridComponent } from '../grid-component/grid.component';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent implements OnInit {
  private apiEndpoint: string = environment.apiItems;

  itemList: ItemModel[] = [];
  itemColumns: { field: keyof ItemModel; header: string }[] = [
    { field: 'itemName', header: 'Name' },
    { field: 'itemRarity', header: 'Rarity' },
    { field: 'itemCost', header: 'Cost' },
    { field: 'itemType', header: 'Type' },
  ];

  constructor(
    private _api: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._api.get<ItemModel[]>(this.apiEndpoint).subscribe(data => {
      this.itemList = data;
      this.cdr.detectChanges();
    })
  }
}
