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
  isInvalidId:boolean=false;

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
          
          this.isEmpty = true;
        } 
        else {
          this.activeContactId = this.contactsDataService.allContacts[0].id;
          this.router.navigateByUrl('/home/' + this.activeContactId);
        }
        
      }
    else
    {
      if(this.contactsDataService.sendActiveContact(this.activeContactId).status==false)
      {
        this.isInvalidId=true;
      }
    }
    });
  }

  updateActiveContact(): void {
    this.router.navigateByUrl('home/' + this.activeContactId + '/edit');
  }

  deleteActiveContact(): void {
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
