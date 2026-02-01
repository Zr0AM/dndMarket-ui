import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpParams } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform GET request', () => {
    const dummyData = { id: 1, name: 'Test' };
    service.get('/test').subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should perform GET request with options', () => {
    const dummyData = { id: 1, name: 'Test' };
    const options = { params: new HttpParams().set('param', 'value') };

    service.get('/test', options).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(req => req.url === `${environment.apiUrl}/test` && req.params.has('param'));
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should perform POST request', () => {
    const dummyData = { id: 1, name: 'Test' };
    const body = { name: 'Test' };
    service.post('/test', body).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    req.flush(dummyData);
  });

  it('should perform POST request with options', () => {
    const dummyData = { id: 1, name: 'Test' };
    const body = { name: 'Test' };
    const options = { headers: new HttpHeaders().set('Custom-Header', 'value') };

    service.post('/test', body, options).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.has('Custom-Header')).toBeTrue();
    req.flush(dummyData);
  });

  it('should perform PUT request', () => {
    const dummyData = { id: 1, name: 'Test' };
    const body = { name: 'Test' };
    service.put('/test', body).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(body);
    req.flush(dummyData);
  });

  it('should perform PUT request with options', () => {
    const dummyData = { id: 1, name: 'Test' };
    const body = { name: 'Test' };
    const options = { headers: new HttpHeaders().set('Custom-Header', 'value') };

    service.put('/test', body, options).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.has('Custom-Header')).toBeTrue();
    req.flush(dummyData);
  });

  it('should perform PATCH request', () => {
    const dummyData = { id: 1, name: 'Test' };
    const body = { name: 'Test' };
    service.patch('/test', body).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(body);
    req.flush(dummyData);
  });

  it('should perform PATCH request with options', () => {
    const dummyData = { id: 1, name: 'Test' };
    const body = { name: 'Test' };
    const options = { headers: new HttpHeaders().set('Custom-Header', 'value') };

    service.patch('/test', body, options).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.headers.has('Custom-Header')).toBeTrue();
    req.flush(dummyData);
  });

  it('should perform DELETE request', () => {
    const dummyData = { success: true };
    service.delete('/test').subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyData);
  });

  it('should perform DELETE request with options', () => {
    const dummyData = { success: true };
    const options = { params: new HttpParams().set('param', 'value') };

    service.delete('/test', options).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(req => req.url === `${environment.apiUrl}/test` && req.params.has('param'));
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyData);
  });
});
