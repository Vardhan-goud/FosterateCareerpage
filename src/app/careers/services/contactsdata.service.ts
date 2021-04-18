import { Injectable } from '@angular/core';
import { Contact } from '../model/contactdefinition.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsdataService {
  constructor() {}

 

  allContacts: Contact[] = [];
  index: number;

  sendAllContacts(): { contactlist: Array<Contact>; status: boolean } {
    if (this.allContacts.length == 0) {
      return { contactlist: this.allContacts, status: false };
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

  sendActiveContact(activeId: number): Contact | null {
    this.index = this.allContacts.findIndex(
      (contact) => contact.id == activeId
    );
    if (this.index == -1) {
      return null;
    }
    return this.allContacts[this.index];
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

  sendLengthOfArray(): number {
    return this.allContacts.length;
  }
}
