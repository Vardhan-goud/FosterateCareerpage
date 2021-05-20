import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../model';
import { ContactsDataService } from '../../services';

@Component({
  selector: 'app-activecontactview',
  templateUrl: './activecontactview.component.html',
  styleUrls: ['./activecontactview.component.scss'],
})
export class ActiveContactViewComponent implements OnInit {
  activeContactId: string;
  activeContactData:Contact;
  allContacts:Contact[]=[];
  loading:boolean=true;
  constructor(
    private ContactsDataService: ContactsDataService,
    private activeRoute: ActivatedRoute,
    private firestore:AngularFirestore,
  ) {}

  ngOnInit(): void 
{
  this.activeRoute.params.subscribe((params) => {
  this.activeContactId = params['id'];
    if(this.activeContactId!=undefined)
    {
      this.ContactsDataService.getContact((this.activeContactId)).subscribe((data)=>
      {
      if(data.Status)
      {
        this.activeContactData=data.activeContact;
        this.loading=false;
      }  
      })
    }
  })
}

}
