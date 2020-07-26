import {Injectable, NgModule} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../interface';

@Injectable({providedIn: 'root'})
export class AuthService {

  private token = null

  constructor(
    private http: HttpClient,
  ) {
  }

  error$: Subject<string> = new Subject<string>()

  getToken(): string {
    return localStorage.getItem('auth-token')
  }

  setToken(token: string): void {
    this.token = token
  }

  logout(): void {
    this.setToken(null)
  }

  login(user: User): Observable<{token: string}> {
    console.log(user);
    return this.http.post<{token: string}>(`https://ancient-bastion-90271.herokuapp.com/api/auth/admin/login`, user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
          }

        ),
        catchError(this.handleError.bind(this))
      )
  }

  register(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>(`https://ancient-bastion-90271.herokuapp.com/api/auth/register`, user)
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const {message} = error.error
    this.error$.next(message)
    return throwError(error)
  }
}
