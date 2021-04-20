import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsDataService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  activeContactId: number;
  isEmpty: boolean = false;

  constructor(
    private contactsDataService: ContactsDataService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.activeContactId = parseInt(params['id']);

      if (isNaN(this.activeContactId)) {
        if (this.contactsDataService.allContacts.length == 0) {
          this.deleteActiveContact(1);
        } else {
          this.activeContactId = this.contactsDataService.allContacts[0].id;
          this.router.navigateByUrl('/home/' + this.activeContactId);
        }
      }
    });
  }

  updateActiveContact(): void {
    this.router.navigateByUrl('home/' + this.activeContactId + '/edit');
  }

  deleteActiveContact(val?: number): void {
    if (val == 1) {
      this.isEmpty = true;
      this.router.navigateByUrl('/home');
    }
    this.contactsDataService.deleteActiveContact(this.activeContactId);
    if (this.contactsDataService.allContacts.length >= 1) {
      this.router.navigateByUrl(
        '/home/' + this.contactsDataService.allContacts[0].id
      );
    }
    if (this.contactsDataService.allContacts.length == 0) {
      this.isEmpty = true;
      this.router.navigateByUrl('/home');
    }
  }
}
