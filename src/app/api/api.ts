import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public get<T>(url: string, options?: { headers?: HttpHeaders; params?: HttpParams; }): Observable<T> {
    return this.http.get<T>(this.apiUrl + url, options);
  }

  public post<T>(url: string, body: any, options?: { headers?: HttpHeaders; params?: HttpParams; }): Observable<T> {
    return this.http.post<T>(this.apiUrl + url, body, options);
  }

  public put<T>(url: string, body: any, options?: { headers?: HttpHeaders; params?: HttpParams; }): Observable<T> {
    return this.http.put<T>(this.apiUrl + url, body, options);
  }

  public patch<T>(url: string, body: any, options?: { headers?: HttpHeaders; params?: HttpParams; }): Observable<T> {
    return this.http.patch<T>(this.apiUrl + url, body, options);
  }

  public delete<T>(url: string, options?: { headers?: HttpHeaders; params?: HttpParams; }): Observable<T> {
    return this.http.delete<T>(this.apiUrl + url, options);
  }

}
