import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grid-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent<T> {
  private _originalData: T[] = [];

  @Input()
  set data(data: T[]) {
    this._originalData = data ? [...data] : [];
    this.applyChanges();
  }

  @Input() columns: { field: keyof T, header: string }[] = [];

  processedData: T[] = [];
  sortField: keyof T | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  filterValues: { [key: string]: string } = {};
  searchValues: { [key: string]: string } = {};
  uniqueColumnValues: { [key: string]: any[] } = {};

  private generateUniqueColumnValues(data: T[]) {
    this.columns.forEach(col => {
      const uniqueValues = [...new Set(data.map(item => item[col.field]))];
      this.uniqueColumnValues[col.field as string] = uniqueValues.sort();
    });
  }

  private applyChanges() {
    let tempData = [...this._originalData];

    // Apply dropdown filters
    const activeDropdownFilters = Object.keys(this.filterValues).filter(key => this.filterValues[key]);
    if (activeDropdownFilters.length > 0) {
      tempData = tempData.filter(item => {
        return activeDropdownFilters.every(key => {
          return String(item[key as keyof T]) === this.filterValues[key];
        });
      });
    }

    // Apply search box filters
    const activeSearchFilters = Object.keys(this.searchValues).filter(key => this.searchValues[key]);
    if (activeSearchFilters.length > 0) {
      tempData = tempData.filter(item => {
        return activeSearchFilters.every(key => {
          const searchValue = this.searchValues[key].toLowerCase();
          return String(item[key as keyof T]).toLowerCase().includes(searchValue);
        });
      });
    }

    // Generate unique values from the fully filtered data
    this.generateUniqueColumnValues(tempData);

    // Apply sorting
    if (this.sortField) {
      tempData.sort((a, b) => {
        const aValue = a[this.sortField!];
        const bValue = b[this.sortField!];

        if (aValue < bValue) {
          return this.sortDirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return this.sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    this.processedData = tempData;
  }

  sort(field: keyof T) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyChanges();
  }

  applyFiltersAndSearch() {
    this.applyChanges();
  }

  clearAll() {
    this.filterValues = {};
    this.searchValues = {};
    this.applyChanges();
  }
}
