import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsDataService } from '../../services';
import { Contact } from '../../model';

@Component({
  selector: 'app-contactsform',
  templateUrl: './contactsform.component.html',
  styleUrls: ['./contactsform.component.scss'],
})
export class ContactsFormComponent implements OnInit {
  showeditform: boolean;
  contactform: FormGroup;
  formdata: Contact;
  activeContactId: number;
  activeContactData: Contact;
 
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

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.activeContactId = parseInt(params['id']);
      if (isNaN(this.activeContactId)) {
        this.showeditform = false;
      } else {
        this.showeditform = true;
      }
    });
   
    this.activeContactData = this.ContactsDataService.sendActiveContact(this.activeContactId).contact;
    this.contactform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern('[a-z A-Z 0-9 \. \- \_]+[@][a-z]{2,6}[\.][a-z]{2,3}')]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern('[6-9][0-9]{9}'),
        ],
      ],
      landline: [''],
      website: [''],
      address: [''],
    });
    this.contactform.valueChanges.subscribe((value:string)=>
     {
      this.CheckValid(this.contactform);
     })

    if (this.showeditform == true) {
      this.contactform.setValue({
        name: this.activeContactData.name,
        email: this.activeContactData.email,
        mobile: this.activeContactData.mobile,
        landline: this.activeContactData.landline,
        website: this.activeContactData.website,
        address: this.activeContactData.address,
      });
    }
  }
  
  submitForm():void {
    if (this.contactform.valid) {
      if (this.showeditform == true) {
        this.ContactsDataService.updateActiveContact(
          this.activeContactId,
          this.contactform.value
        );
        console.log(this.contactform.value);
        this.showeditform = false;
        this.router.navigateByUrl('/home/' + this.activeContactId);
      } else {
        this.formdata = this.contactform.value;
        if (!this.ContactsDataService.sendAllContacts().status) {
          this.formdata['id'] = 1;
        } else {
          this.formdata['id'] =
            this.ContactsDataService.allContacts[this.ContactsDataService.allContacts.length- 1].id + 1;
        }
        this.ContactsDataService.addNewContact(this.formdata);
        this.router.navigateByUrl('/home/' + this.formdata['id']);
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




