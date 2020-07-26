import {Injectable, NgModule} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Contact, User} from '../interface';

@Injectable({providedIn: 'root'})
export class ListContactsService {

  private token = null

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`http://localhost:3000/users`)
  }

  add(contact: Contact): Observable<Contact> {
    console.log('123');
    return this.http.post<Contact>(`http://localhost:3000/users`, contact)
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/users/${id}`)
  }

  update(id: number, body): Observable<any> {
    return this.http.patch(`http://localhost:3000/users/${id}`, body)
  }
}
