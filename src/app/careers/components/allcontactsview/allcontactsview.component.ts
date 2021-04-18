import { Component, OnInit } from '@angular/core';
import { ContactsdataService } from '../../services';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../model';

@Component({
  selector: 'app-allcontactsview',
  templateUrl: './allcontactsview.component.html',
  styleUrls: ['./allcontactsview.component.scss'],
})
export class AllcontactsviewComponent implements OnInit {
  allContacts: Contact[];
  activeContactId: number;
  activehref: string = '';

  constructor(
    private contactsDataService: ContactsdataService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.contactsDataService.sendAllContacts()['status'] == true) {
      this.allContacts = this.contactsDataService.sendAllContacts()[ 'contactlist' ];
    }

    this.activehref = this.router.url;

    this.activeRoute.params.subscribe((params) => {
      this.activeContactId = parseInt(params['id']);

      if (isNaN(this.activeContactId)) {
        this.activeContactId = this.contactsDataService.allContacts[0]['id'];
        if (this.activehref == '/add') {
          this.activeContactId = 0;
        }
      }
    });
  }
}
