import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../model';
import { ContactsdataService } from '../../services';

@Component({
  selector: 'app-activecontactview',
  templateUrl: './activecontactview.component.html',
  styleUrls: ['./activecontactview.component.scss'],
})
export class ActivecontactviewComponent implements OnInit {
  activeContactId: number;
  activeContactData: Contact;
  constructor(
    private contactsDataService: ContactsdataService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeContactData = this.contactsDataService.allContacts[0];
    this.activeRoute.params.subscribe((params) => {
      this.activeContactId = parseInt(params['id']);
      if (isNaN(this.activeContactId)) {
        this.activeContactId = 1;
      }
      this.activeContactData = this.contactsDataService.sendActiveContact(
        this.activeContactId
      );
    });
  }
}
