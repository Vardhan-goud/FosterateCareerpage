import { Injectable } from '@angular/core';
import { Contact } from '../model/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsDataService {
  constructor() {}

 

  allContacts: Contact[] = [];
  index: number;

  sendAllContacts(): { contactlist: Array<Contact>; status: boolean } {
    if (this.allContacts.length == 0) {
      return { contactlist: null, status: false };
    } else {
      return { contactlist: this.allContacts, status: true };
    }
  }

  addNewContact(contact): void {
    if(contact!=null)
    {
      this.allContacts.push(contact);
    }
    
  }

  sendActiveContact(activeId: number):{ contact: Contact; status: boolean } {
    this.index = this.allContacts.findIndex(
      (contact) => contact.id == activeId
    );
    if (this.index == -1) {
      return {contact : null, status : false};
    }
    return {contact :this.allContacts[this.index],status : true};
  }

  deleteActiveContact(activeId: number): void {
    this.index = this.allContacts.findIndex(
      (contact) => contact.id == activeId
    );
    this.allContacts.splice(this.index, 1);
  }

  updateActiveContact(activeId: number, Newdata: Contact): void {
    this.index = this.allContacts.findIndex(
      (contact) => contact.id == activeId
    );
    this.allContacts[this.index] = Newdata;
    this.allContacts[this.index].id = activeId;
  }

}
