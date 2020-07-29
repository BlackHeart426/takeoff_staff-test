import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ListContactsService} from '../../service/list-contacts.service';
import {Observable, Subscription} from 'rxjs';
import {Contact, User} from '../../interface';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {MaterialInstance, MaterialService} from '../../service/material.service';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss']
})
export class ListContactsComponent implements OnInit, OnDestroy {

  @ViewChild('modal') modalRef: ElementRef

  listContacts: Contact[] = []
  form: FormGroup
  formEdit: FormGroup
  gSub: Subscription
  modal: MaterialInstance
  contactId = null
  searchStr = ''

  constructor(
    private listContactsService: ListContactsService
  ) { }

  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe()
    }
    this.modal.destroy()
  }

  ngOnInit(): void {
    MaterialService.updateTextInputs()
    // this.listContacts$ = this.listContactsService.getAll()
    this.gSub = this.listContactsService.getAll().subscribe(contacts => {
      this.listContacts = contacts
    })

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
    })

    this.formEdit = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
    })

  }

  onRemovePosition(item: any) {
    const decision = window.confirm(`Удалить позицию "${this.listContacts.find(contact => contact.id === item).name}"?`)
    if (decision) {
      this.listContactsService.remove(item)
        .subscribe(
          response => {
            MaterialService.toast('Контакт удален')
            this.listContacts = this.listContacts.filter(i => i.id !== item)
          },
          error => MaterialService.toast('Контакт не удален')
        )
    }
  }

  onEditPosition(id: any) {
    const contact = this.listContacts.find(p => p.id === id)
    this.formEdit.patchValue({
      name: contact.name,
      phone: contact.phone,
    })
    this.contactId = id;
    console.log(id);
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onSubmit() {
    if (this.form.invalid) {
      MaterialService.toast('Не все поля заполнены')
      return
    }
    this.form.disable()

    const contact: Contact = {
      name: this.form.value.name,
      phone: this.form.value.phone
    }

    const completed = () => {
      this.form.reset()
      this.form.enable()
    }

    this.listContactsService.add(contact).subscribe(position => {
        MaterialService.toast('Контакт добавлен')
        this.listContacts.push(position)
      },error => MaterialService.toast('Ошибка'),
      completed
    )

  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onCancel() {
    this.modal.close()
  }

  onSubmitEdit() {
    if (this.formEdit.invalid) {
      MaterialService.toast('Не все поля заполнены')
      return
    }

    const contact: Contact = {
      id: this.contactId,
      name: this.formEdit.value.name,
      phone: this.formEdit.value.phone
    }

    this.listContactsService.update(contact).subscribe(position => {
      MaterialService.toast('Контакт изменен')
      this.listContacts = this.listContacts.map((item, i) => {
        if (item.id === this.contactId) {
          return contact
        } else  {
          return item
        }
      })
      },error => MaterialService.toast('Ошибка')
    )
  }
}
