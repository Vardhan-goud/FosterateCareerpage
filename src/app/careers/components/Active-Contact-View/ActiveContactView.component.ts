import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../model';
import { ContactsDataService } from '../../services';

@Component({
  selector: 'app-activecontactview',
  templateUrl: './activecontactview.component.html',
  styleUrls: ['./activecontactview.component.scss'],
})
export class ActiveContactViewComponent implements OnInit {
  activeContactId: number;
  activeContactData: Contact;
  constructor(
    private ContactsDataService: ContactsDataService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeContactData = this.ContactsDataService.allContacts[0];
    this.activeRoute.params.subscribe((params) => {
      this.activeContactId = parseInt(params['id']);
      if (isNaN(this.activeContactId)) {
        this.activeContactId = 1;
      }
      this.activeContactData = this.ContactsDataService.sendActiveContact( this.activeContactId ).contact;
    });
  }
}
