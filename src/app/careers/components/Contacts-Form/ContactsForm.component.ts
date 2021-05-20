import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsDataService } from '../../services';
import { Contact } from '../../model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-contactsform',
  templateUrl: './contactsform.component.html',
  styleUrls: ['./contactsform.component.scss'],
})

export class ContactsFormComponent implements OnInit {
  showeditform: boolean;
  submitText='Add';
  contactform: FormGroup;
  formdata: Contact;
  activeContactId:string;
  activeContactData:Contact;
  allContacts:Contact[];
  loading:boolean=true;
 
  validationmessages = {
    'name': {
      'required': ' (Name is  required)',
    },
    'email': {
      'required': ' (Email is required)',
      'pattern':'(Invalid Email-id)' ,
    },
    'mobile': {
      'required': ' (Mobile.No is required)',
      'pattern': ' (Invalid Mobile.No)',
    },
  };

  formerrors = {
    'name': '',
    'email': '',
    'mobile': '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private ContactsDataService: ContactsDataService,
    private router: Router,
    private route: ActivatedRoute,
    private firestore:AngularFirestore
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
    this.activeContactId = params['id'];
    if (this.activeContactId==undefined) {
      this.showeditform = false;
      this.submitText='Add';
      this.loading=false;
    } 
    else {
      this.ContactsDataService.getContact((this.activeContactId)).subscribe((data)=>
      {
        this.activeContactData=data.activeContact;
        this.loading=false;
        this.showeditform = true;
        this.contactform.setValue({
          name: this.activeContactData.name,
          email: this.activeContactData.email,
          mobile: this.activeContactData.mobile,
          landline: this.activeContactData.landline,
          website: this.activeContactData.website,
          address: this.activeContactData.address,
          });
          this.submitText='Update';
        }) 
      }        
    });
   
  this.contactform = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required,Validators.pattern('[a-z A-Z 0-9 \. \- \_]+[@][a-z]{2,6}[\.][a-z]{2,3}')]],
    mobile: ['',[ Validators.required, Validators.pattern('[6-9][0-9]{9}'),]],
    landline: [''],
    website: [''],
    address: [''],
  });
    this.contactform.valueChanges.subscribe((value:string)=>
     {
      this.CheckValid(this.contactform);
     })
  }
  
  submitForm():void {
    if (this.contactform.valid) {
      if (this.showeditform == true) {
        this.ContactsDataService.updateActiveContact(
          this.activeContactId,
          this.contactform.value
        );
        this.showeditform = false;
        this.router.navigateByUrl('/home/' + this.activeContactId);
      } else {
        this.formdata = this.contactform.value;
        this.ContactsDataService.addNewContact(this.formdata);
      }
    } else {
      this.CheckValid(this.contactform, true);
    }
  }

  CheckValid(
    group: FormGroup = this.contactform,
    submittedempty: boolean = false
  ): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractcontrol = group.get(key);
      this.formerrors[key] = '';
      if (submittedempty == true) {
        abstractcontrol.markAsDirty();
      }
      if (
        abstractcontrol &&
        !abstractcontrol.valid &&
        (abstractcontrol.dirty || abstractcontrol.touched)
      ) {
        const messages = this.validationmessages[key];
        for (const errorkey in abstractcontrol.errors) {
          if (errorkey) {
            this.formerrors[key] += messages[errorkey] + ' ';
          }
        }
      }
      
    });
  }

}







