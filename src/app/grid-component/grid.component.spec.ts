import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';
import { describe, it, expect, beforeEach } from 'vitest';

interface TestData {
  id: number;
  name: string;
  category: string;
}

describe('GridComponent', () => {
  let component: GridComponent<TestData>;
  let fixture: ComponentFixture<GridComponent<TestData>>;
  const testData: TestData[] = [
    { id: 1, name: 'Apple', category: 'Fruit' },
    { id: 2, name: 'Banana', category: 'Fruit' },
    { id: 3, name: 'Carrot', category: 'Vegetable' },
  ];
  const columns = [
    { field: 'name' as keyof TestData, header: 'Name' },
    { field: 'category' as keyof TestData, header: 'Category' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent<GridComponent<TestData>>(GridComponent);
    component = fixture.componentInstance;
    component.columns = columns;
    component.data = testData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with data', () => {
    expect(component.processedData.length).toBe(3);
    expect(component.uniqueColumnValues['category']).toEqual(['Fruit', 'Vegetable']);
  });

  it('should filter by dropdown', () => {
    component.filterValues['category'] = 'Fruit';
    component.applyFiltersAndSearch();
    expect(component.processedData.length).toBe(2);
    expect(component.processedData.every(item => item.category === 'Fruit')).toBe(true);
  });

  it('should filter by search', () => {
    component.searchValues['name'] = 'app';
    component.applyFiltersAndSearch();
    expect(component.processedData.length).toBe(1);
    expect(component.processedData[0].name).toBe('Apple');
  });

  it('should sort data ascending', () => {
    component.sort('name');
    expect(component.sortField).toBe('name');
    expect(component.sortDirection).toBe('asc');
    expect(component.processedData[0].name).toBe('Apple');
    expect(component.processedData[2].name).toBe('Carrot');
  });

  it('should sort data descending', () => {
    component.sort('name'); // First click: asc
    component.sort('name'); // Second click: desc
    expect(component.sortField).toBe('name');
    expect(component.sortDirection).toBe('desc');
    expect(component.processedData[0].name).toBe('Carrot');
    expect(component.processedData[2].name).toBe('Apple');
  });

  it('should clear all filters', () => {
    component.filterValues['category'] = 'Fruit';
    component.searchValues['name'] = 'app';
    component.applyFiltersAndSearch();
    expect(component.processedData.length).toBe(1);

    component.clearAll();
    expect(component.filterValues).toEqual({});
    expect(component.searchValues).toEqual({});
    expect(component.processedData.length).toBe(3);
  });

  it('should handle empty data', () => {
    component.data = null as any;
    expect(component.processedData.length).toBe(0);
  });
});
