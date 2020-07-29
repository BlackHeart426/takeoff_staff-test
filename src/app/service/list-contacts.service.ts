import {Injectable, NgModule} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Contact, FbCreateResponse, User} from '../interface';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ListContactsService {

  private token = null

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(): Observable<Contact[]> {
    return this.http.get(`${environment.fbDbUrl}/contacts.json`)
      .pipe(
        map((response: {[key: string]: any}) => {
          if (response) {
            return Object
              .keys(response)
              .map(key => ({
                ...response[key],
                id: key,
                date: new Date(response[key].date)
              }))
          }
          return []
      }))
  }

  add(contact: Contact): Observable<any> {
    return this.http.post<Contact>(`${environment.fbDbUrl}/contacts.json`, contact)
      .pipe(
        map((response: FbCreateResponse) => {
            return {
              ...contact,
              id: response.name,
              date: new Date(contact.date)
            }
          }
        )
      )
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/contacts/${id}.json`)
  }

  update(contact: Contact): Observable<Contact> {
    return this.http.patch<Contact>(`${environment.fbDbUrl}/contacts/${contact.id}.json`, contact)
  }
}
