import { Component, OnInit } from '@angular/core';
import { ContactsDataService } from '../../services';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../model';

@Component({
  selector: 'app-allcontactsview',
  templateUrl: './allcontactsview.component.html',
  styleUrls: ['./allcontactsview.component.scss'],
})
export class AllContactsViewComponent implements OnInit {
  allContacts: Contact[];
  activeContactId: number;
  activeUrl: string = '';

  constructor(
    private ContactsDataService: ContactsDataService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.ContactsDataService.sendAllContacts()['status'] == true) {
      this.allContacts = this.ContactsDataService.sendAllContacts()[ 'contactlist' ];
    }

    this.activeUrl = this.router.url;

    this.activeRoute.params.subscribe((params) => {
      this.activeContactId = parseInt(params['id']);

      if (isNaN(this.activeContactId)) {
        this.activeContactId = this.ContactsDataService.allContacts[0]['id'];
      }
    });
  }
}
