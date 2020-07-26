import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from '../../interface';
import {MaterialService} from '../../service/material.service';
import {ListContactsService} from '../../service/list-contacts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() contact: Contact
  @Output() onRemove: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() onEdit: EventEmitter<boolean> = new EventEmitter<boolean>()


  constructor(
    private listContactsService: ListContactsService
  ) { }

  ngOnInit(): void {
    MaterialService.updateTextInputs()
  }

  removePosition(item: any) {
    this.onRemove.emit(item)
  }

  editPosition(item: any) {
    this.onEdit.emit(item)
  }
}
