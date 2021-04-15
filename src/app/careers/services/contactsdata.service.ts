import { Injectable } from '@angular/core';
import {Contact} from '../contactdefinition.model'


@Injectable({
  providedIn: 'root'
})
export class ContactsdataService {

  constructor() { }

  c1:Contact=new Contact(1,"Harsha Vardhan Pendyala","harsha@fosterate.com",7777888855, null ,"",'Hyderabad');
  c2:Contact=new Contact(2,"Network Duke","duke@fosterate.com ",7777888855,null,"",'Hyderabad');
  c3:Contact=new Contact(3,"Arshaque Mohammed","arshaque@fosterate.com",7777888855,null,"",'Hyderabad');

 

  allcontacts:Contact[]=[this.c1,this.c2,this.c3];



  add_to_allcontacts(contact):void
  {
     this.allcontacts.push(contact);
      
  };


  


  sendActiveContact(val:number): Contact|null
  {
      for(let i=0;i<this.allcontacts.length;i++)
      {
        if(this.allcontacts[i]['id']==val)
        {
          return this.allcontacts[i];
        }
      }
      return null;
  }


  removeData(activeId:number):void
  {
    for(let i=0;i<this.allcontacts.length;i++)
    {
      if(this.allcontacts[i]['id']==activeId)
      {
        this.allcontacts.splice(i,1);
       
      }
    }
  }


  updateActiveContact(activeId:number,Newdata:Contact):void
  {
    for(let i=0;i<this.allcontacts.length;i++)
    {
      if(this.allcontacts[i]['id']==activeId)
      {
          this.allcontacts[i]['name']=Newdata['name'];
          this.allcontacts[i]['email']=Newdata['email'];
          this.allcontacts[i]['website']=Newdata['website'];
          this.allcontacts[i]['landline']=Newdata['landline'];
          this.allcontacts[i]['mobile']=Newdata['mobile'];
          this.allcontacts[i]['address']=Newdata['address'];
      }
    }
  }

}
