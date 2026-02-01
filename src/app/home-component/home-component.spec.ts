import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home-component';
import { ApiService } from '../api/api';
import { SnackbarService } from '../snackbar/snackbar.service';
import { of, throwError } from 'rxjs';
import { ItemModel } from '../../models/item.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiServiceSpy: any;
  let snackbarServiceSpy: any;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['get']);
    snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', ['show']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: SnackbarService, useValue: snackbarServiceSpy }
      ]
    })
    .compileComponents();

    // Default mock behavior
    apiServiceSpy.get.and.returnValue(of([]));

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load items on init', () => {
    const mockItems: ItemModel[] = [
      {
        id: 1,
        itemName: 'Sword',
        itemRarity: 'Common',
        itemCost: 10,
        itemType: 'Weapon',
        itemRestrictions: '',
        itemAttunement: '',
        itemSource: '',
        itemUrl: '',
        itemVisualDesc: '',
        itemShopkeeperDesc: '',
        itemSelected: false
      }
    ];
    apiServiceSpy.get.and.returnValue(of(mockItems));

    fixture.detectChanges(); // triggers ngOnInit

    expect(component.itemList).toEqual(mockItems);
  });

  it('should show snackbar on api error', () => {
    apiServiceSpy.get.and.returnValue(throwError(() => new Error('API Error')));

    fixture.detectChanges(); // triggers ngOnInit

    expect(snackbarServiceSpy.show).toHaveBeenCalledWith('Data is not currently available');
  });
});
