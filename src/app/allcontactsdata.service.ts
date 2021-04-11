import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AllcontactsdataService {

 

  constructor() { }
  
  allcontacts:any[]=[
    {
      'id':1,
      'name':"Harsha Vardhan Pendyala",
       'email':"harsha@fosterate.com",
        'mobile':"7777888855",
        'website':'',
        'landline':'',
        'address':'hyderabad',
      },
  {
    'id':2,
    'name':"Network Duke",
      'email':"duke@fosterate.com",
       'mobile':"7777888855",
       'website':'',
       'landline':'',
       'address':'hyderabad',
     },

     {
       'id':3,
      'name':"Arshaque Mohammed",
     'email':"arshaque@fosterate.com",
      'mobile':"7777888855",
      'website':'',
      'landline':'',
      'address':'hyderabad',
    }

  ];

  add_to_allcontacts(contact):void
  {
     this.allcontacts.push(contact);
     
     
  };


  send_allcontacts():object[]
  {
    
    return this.allcontacts;
  };


  sendActiveContact(val:number)
  {
      for(let i=0;i<this.allcontacts.length;i++)
      {
        if(this.allcontacts[i]['id']==val)
        {
          return this.allcontacts[i];
        }
      }
  }


  removeData(activeId:number)
  {
    for(let i=0;i<this.allcontacts.length;i++)
    {
      if(this.allcontacts[i]['id']==activeId)
      {
        this.allcontacts.splice(i,1);
       
      }
    }
  }

  updateActiveContact(activeId:number,Newdata:object)
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
