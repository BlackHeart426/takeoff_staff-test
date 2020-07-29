import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from '../interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(contacts: Contact[], search = ''): Contact[] {
    if (!search.trim()) {
      return contacts
    }

    return contacts.filter( contacts => {
      return contacts.name.toLowerCase().includes(search.toLowerCase())
        || contacts.phone.toLowerCase().includes(search.toLowerCase())
    })
  }

}
