import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
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
      'required': ' (name is  required)',
    },
    'email': {
      'required': ' (email is required)',
      'emaildomain':'(invalid email)' 
    },
    'mobile': {
      'required': ' (ph.no is required)',
      'min': ' (enter valid ph.no)',
      'max': ' (enter valid ph.no)',
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
      email: ['', [Validators.required,emaildomain]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.min(1111111111),
          Validators.max(9999999999),
        ],
      ],
      landline: [''],
      website: [''],
      address: [''],
    });

    function emaildomain(control:AbstractControl):{[key:string]:any}|null
    {
        const email:string=control.value;
        const domain:string =email.substring(email.lastIndexOf('.')+1);
        const isProper:boolean=email.includes('@')
        if(!isProper)
        {
          return {'emaildomain':true};
        }
        if(domain=='in' || domain=="com" || domain=='org'|| email=="")
        {
          return null;
        }
        else{
          return {'emaildomain':true};
        }
    }

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
        this.showeditform = false;
        this.router.navigateByUrl('/home/' + this.activeContactId);
      } else {
        this.formdata = this.contactform.value;
        if (this.ContactsDataService.allContacts.length == 0) {
          this.formdata['id'] = 1;
        } else {
          this.formdata['id'] =
            this.ContactsDataService.allContacts[this.ContactsDataService.allContacts.length- 1].id + 1;
        }
        this.ContactsDataService.addNewContact(this.formdata);
        this.changeRoute();
      }
    } else {
      this.CheckValid(this.contactform, true);
    }
  }

  changeRoute():void {
    this.router.navigateByUrl('/home/' + this.formdata['id']);
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




