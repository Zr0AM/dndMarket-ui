import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';

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

  it('should filter by multiple dropdowns', () => {
    component.filterValues['category'] = 'Fruit';
    component.filterValues['name'] = 'Apple';
    component.applyFiltersAndSearch();
    expect(component.processedData.length).toBe(1);
    expect(component.processedData[0].name).toBe('Apple');
  });

  it('should filter by search', () => {
    component.searchValues['name'] = 'app';
    component.applyFiltersAndSearch();
    expect(component.processedData.length).toBe(1);
    expect(component.processedData[0].name).toBe('Apple');
  });

  it('should filter by multiple search fields', () => {
    component.searchValues['name'] = 'a'; // Apple, Banana, Carrot
    component.searchValues['category'] = 'Fruit'; // Apple, Banana
    component.applyFiltersAndSearch();
    expect(component.processedData.length).toBe(2);
    expect(component.processedData.map(d => d.name)).toEqual(['Apple', 'Banana']);
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

  it('should toggle sort direction back to ascending', () => {
    component.sort('name'); // asc
    component.sort('name'); // desc
    component.sort('name'); // asc
    expect(component.sortDirection).toBe('asc');
    expect(component.processedData[0].name).toBe('Apple');
  });

  it('should handle sorting with equal values', () => {
    const dataWithDuplicates: TestData[] = [
      { id: 1, name: 'Apple', category: 'Fruit' },
      { id: 2, name: 'Apple', category: 'Fruit' },
    ];
    component.data = dataWithDuplicates;
    component.sort('name');
    expect(component.processedData.length).toBe(2);
    expect(component.processedData[0].name).toBe('Apple');
    expect(component.processedData[1].name).toBe('Apple');
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

  it('should cover sort direction logic when comparing smaller value to larger value', () => {
    // Using 3 elements to ensure we trigger comparisons where a < b (Line 71)
    // regardless of browser sort implementation details.
    component.data = [
      { id: 2, name: 'B', category: 'Test' },
      { id: 1, name: 'A', category: 'Test' },
      { id: 3, name: 'C', category: 'Test' }
    ];

    // Ascending: 'A' < 'B' -> -1 (Line 71 true branch)
    component.sort('name');
    expect(component.processedData.map(x => x.name)).toEqual(['A', 'B', 'C']);

    // Descending: 'A' < 'B' -> 1 (Line 71 false branch)
    component.sort('name');
    expect(component.processedData.map(x => x.name)).toEqual(['C', 'B', 'A']);
  });
});
