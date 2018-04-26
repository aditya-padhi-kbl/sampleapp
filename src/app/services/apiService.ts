import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    constructor(public httpClient: HttpClient) {}

    post<T>(url: string, params: T): Observable<Array<T>> {
        return this.httpClient.post<Array<T>>(url, params);
    }

    delete<T>(url: string) {
        return this.httpClient.delete(url);
    }

    get<T>(url: string): Observable<Array<T>> {
        return this.httpClient.get<Array<T>>(url);
    }
}
