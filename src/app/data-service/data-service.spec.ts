import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './data-service';
import { ApiService } from '../api/api';
import { of } from 'rxjs';

describe('DataService', () => {
  let service: DataService<any>;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService, ApiService]
    });
    service = TestBed.inject(DataService);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get data and update rows', () => {
    const dummyData = [{ id: 1, name: 'Test' }];
    spyOn(apiService, 'get').and.returnValue(of(dummyData));

    service.getData('/test');

    expect(apiService.get).toHaveBeenCalledWith('/test');
    expect(service.rows).toEqual(dummyData);
  });
});
