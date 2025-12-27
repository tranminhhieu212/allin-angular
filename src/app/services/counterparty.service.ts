import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterpartyService {
  private apiUrl = `http://localhost:3000/api/counterparty`;

  constructor(private http: HttpClient) { }

  getCounterparties(filterModel?: Record<string, any>, page: number = 1, pageSize: number = 30): Observable<any> {
    const params: Record<string, string> = {
      page: String(page),
      pageSize: String(pageSize)
    };

    if (filterModel) {
      Object.entries(filterModel).forEach(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          return;
        }
        if (Array.isArray(value)) {
          params[key] = value.join(',');
        }
        else {
          params[key] = String(value);
        }
      });
    }

    return this.http.get(this.apiUrl, { params });
  }

  getCounterpartyByName(name: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(this.apiUrl, {
      params,
      headers,
      withCredentials: true
    });
  }
}
