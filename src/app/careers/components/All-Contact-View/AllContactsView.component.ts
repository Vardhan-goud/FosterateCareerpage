import { Component, OnInit } from '@angular/core';
import { ContactsDataService } from '../../services';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-allcontactsview',
  templateUrl: './allcontactsview.component.html',
  styleUrls: ['./allcontactsview.component.scss'],
})
export class AllContactsViewComponent implements OnInit {
  allContacts: Contact[]=[];
  activeContactId: string;
  loading:boolean=true;

  constructor(
    private ContactsDataService: ContactsDataService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private firestore:AngularFirestore
  ) {}

  ngOnInit(): void 
  {
    this.activeRoute.params.subscribe((params) => {
    this.ContactsDataService.getContacts().subscribe((data) => {  
    if(data.Status==true)
    {

      this.allContacts=data.allContacts;
      
    } 
    this.loading=false;  
    });
    this.activeContactId = params['id'];
    if (this.activeContactId==undefined && this.allContacts.length!=0) {
      this.activeContactId = this.allContacts[0]['id'];
      
    }
    
    });
  }
  
}
