import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}
  public getAll(): Observable<any> {
    return this.http
      .get('http://localhost:4800/api')
      .pipe(catchError(this.HandleError));
  }

  public getOne(id: any): Observable<any> {
    return this.http
      .get(`http://localhost:4800/api/${id}`)
      .pipe(catchError(this.HandleError));
  }
 

  public add(data: any): Observable<any> {
    return this.http
      .post('http://localhost:4800/api/register', data)
      .pipe(catchError(this.HandleError));
  }
  private HandleError(error: HttpErrorResponse): any {
    return throwError(() => error);
  }

  public logins(data: any): Observable<any> {
    return this.http
      .post('http://localhost:4800/api/login', data)
      .pipe(catchError(this.HandleError));
  }

  public stripeproduct(): Observable<any> {
    return this.http
      .get('http://localhost:4800/api/stripe-product')
      .pipe(catchError(this.HandleError));
  }
  public stripecheckout(data: any): Observable<any> {
    return this.http
      .post('http://localhost:4800/api/checkout', { data })
      .pipe(catchError(this.HandleError));
  }

  public profileDetails(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    return this.http
      .post(
        'http://localhost:4800/api/profile-details',
        {},
        { headers: headers }
      )
      .pipe(catchError(this.HandleError));
  }

  public subretrieve(id: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    return this.http
      .post(
        'http://localhost:4800/api/sub-retrieve',
        { data: { id: id } },
        { headers: headers }
      )
      .pipe(catchError(this.HandleError));
  }
}
