import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../model';
import { ContactsDataService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  activeContactId: string;
  isEmpty: boolean;
  bool:boolean=false;
  allContacts:Contact[]=[];
  activeContactData:Contact;
  contact:Contact;
  currentPath:string;
  loading:boolean=true;

  constructor(
    private ContactsDataService: ContactsDataService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private firestore:AngularFirestore
  ) {}

  ngOnInit(): void {
    

 this.activeRoute.params.subscribe((params)=>
 {
  this.ContactsDataService.getContacts().subscribe((data) => { 
  if(data.Status)
  {
    this.loading=false;
    this.allContacts=data.allContacts;
    this.isEmpty=false;
    this.currentPath = this.router.url;
    if (this.currentPath == '/home') {
      this.router.navigateByUrl('/home/' + this.allContacts[0]['id']);
    }
  }
  else{
    this.loading=false;
    this.isEmpty=true;
  } 
  }); 
})
}

  updateActiveContact(): void {
    this.activeRoute.params.subscribe((params)=>
    {
       this.activeContactId=params['id'];
    })
    this.router.navigateByUrl('home/' + this.activeContactId + '/edit');
  }

  deleteActiveContact(): void {
    this.activeRoute.params.subscribe((params)=>
    {
       this.activeContactId=params['id'];
    })
    this.ContactsDataService.deleteActiveContact(this.activeContactId);   

    this.router.navigateByUrl('/home'); 
} 
}
