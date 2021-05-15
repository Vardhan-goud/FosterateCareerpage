import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { Contact } from '../model/contact.model';


@Injectable({
  providedIn: 'root',
})
export class ContactsDataService {
  constructor(private firestore:AngularFirestore,private router:Router) {}
  
  allContacts: Contact[] = [];
  index: number;
  activeContact:Contact;
  contact:Contact;
  activeContactId:string;
  status:boolean=false;
  activeStatus:boolean=false;

//get all contacts
  getContacts():Observable<{allContacts:Array<Contact>,Status:boolean}> { 
    return new Observable<any>(sub=>{
      const subscriptionRef = this.firestore.collection("contacts").get()
      .subscribe((contacts)=>{
        if(contacts && !contacts.empty){
          this.allContacts=[]
          contacts.forEach((doc) => {
            this.contact = {
              id: doc.id,
              ...((doc.data() as object) as Contact),
            },
            this.allContacts.push(this.contact);
          }),
          sub.next({allContacts:this.allContacts,Status:true})
        }
        else{
          console.log("no contacts")
          sub.next({allContacts:null,Status:false})
        }
      })
    })

  }
   
 //get single contacts
 getContact(id:string):Observable<{activeContact:Contact,Status:boolean}> {
  this.activeContactId=id;
  return new Observable<any>((obj)=>{
    this.firestore.doc('contacts/'+id).get().subscribe((contact)=>{
      if(contact && contact.exists){
        const currContact=contact.data() as Contact;
        obj.next({activeContact:currContact,Status:true});
      }
      else
      {
        obj.next({activeContact:null,Status:false});
      }
    })
  })
 
}

addNewContact(contact): void {
  if(contact!=null)
  {
    const id=this.firestore.firestore.collection('contacts').doc().id;
    contact['id']=id;
    this.firestore.collection('contacts').doc(id).set(contact).then(doc=>{
    this.router.navigateByUrl("/home/"+id)
})
}
}

deleteActiveContact(activeId:string): void {
  this.firestore.collection("contacts").doc(activeId).delete(); 
}

updateActiveContact(activeId:string, Newdata: Contact): void {
  this.firestore.collection("contacts").doc(activeId).update(Newdata);
  }
}
