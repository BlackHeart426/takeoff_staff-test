import {Injectable, NgModule} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {FbAuthResponse, User} from '../interface';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) {
  }

  error$: Subject<string> = new Subject<string>()

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  private setToken(response: FbAuthResponse | null) {
    if (response){
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }

  logout() {
    this.setToken(null)
  }

  login(user: User): Observable<{token: string}> {
    console.log(user);

    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this)) // TODO why bind???
      )

    // return this.http.post<{token: string}>(`https://ancient-bastion-90271.herokuapp.com/api/auth/admin/login`, user)
    //   .pipe(
    //     tap(
    //       ({token}) => {
    //         localStorage.setItem('auth-token', token)
    //         this.setToken(token)
    //       }
    //
    //     ),
    //     catchError(this.handleError.bind(this))
    //   )
  }

  register(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>(`https://ancient-bastion-90271.herokuapp.com/api/auth/register`, user)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email не найден')
        break
    }

    return throwError(error)
  }
}
