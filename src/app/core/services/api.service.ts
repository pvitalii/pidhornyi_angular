import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {

  constructor(private http: HttpClient) { }

  public get<K = T[]>(path: string) {
    return this.http.get<K>(`api/${path}`);
  }

  public post<K>(path: string, data: K) {
    return this.http.post<T>(`api/${path}`, data);
  }

  public put(path: string, data: Partial<T>) {
    return this.http.put<T>(`api/${path}`, data);
  }

  public delete(path: string) {
    return this.http.delete(`api/${path}`);
  }
}
