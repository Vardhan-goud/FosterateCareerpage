import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { FormGroup,FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsdataService } from '../../services';
import {Contact} from 'src/app/careers/contactdefinition.model';

@Component({
  selector: 'app-contactsform',
  templateUrl: './contactsform.component.html',
  styleUrls: ['./contactsform.component.scss']
})
export class ContactsformComponent implements OnInit {

  @Input()  showeditform:boolean;
  @Output() showeditformChange=new EventEmitter<boolean>();

 
  

 contactform:FormGroup;
 formdata:Contact;
 activeContactId:number;
 activeContactData:Contact;
 allcontactsdata:Contact[];
 
 validationmessages=
 {
   'name':
   {
     'required':' (name is  required)',
   },
   'email':
   {
     'required':' (email is required)',
     'email':' (invalid email)'    },
   'mobile':
   {
     'required':' (ph.no is required)',
     'min':' (enter valid ph.no)',
     'max':' (enter valid ph.no)'
   }
 }

 formerrors=
 {
   'name':'',
   'email':'',
   'mobile':''
 }

  constructor(private fb:FormBuilder,private sc:ContactsdataService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void 
  {

         this.route.params.subscribe
          (params => {
           this.activeContactId=parseInt(params['id']);
           if(isNaN(this.activeContactId))
            {
                  this.activeContactId=1; 
            }
      
    });

    this.allcontactsdata=this.sc.allcontacts;

    this.activeContactData=this.sc.sendActiveContact(this.activeContactId);


    



     this.contactform=this.fb.group(
       {
          
         name:['',Validators.required],
         email:['',[Validators.required,Validators.email]],
         mobile:['',[Validators.required,Validators.min(1111111111),Validators.max(9999999999)]],
         landline:[''],
         website:[''],
         address:[''],
       }
     )


     if(this.showeditform==true)
     {

       this.contactform.setValue(
         {
           name:this.activeContactData.name,
           email:this.activeContactData.email,
           mobile:this.activeContactData.mobile,
           landline:this.activeContactData.landline,
           website:this.activeContactData.website,
           address:this.activeContactData.address, 
         }
       )
     }



   
 }

  


 showdata()
{

  
    
    if(this.contactform.valid)

    {
      
          if(this.showeditform==true)
           {
       
                       this.sc.updateActiveContact(this.activeContactId,this.contactform.value);
                        this.showeditform=false;
                        this.showeditformChange.emit(this.showeditform);
        
             }
            else
            {
                      this.formdata=this.contactform.value;
                            if(this.sc.allcontacts.length==0)
                             {
                                       this.formdata['id']=1;
                             }

                             else
                            {
                                   this.formdata['id']=this.sc.allcontacts[this.sc.allcontacts.length-1].id+1;
                             }
        
                        this.sc.add_to_allcontacts(this.formdata);
                        this.changeNav();
           }

    }
    else
    {
      this.CheckValid(this.contactform,true);
    }

    

}



changeNav()
{

  this.router.navigateByUrl('/home/'+this.formdata['id']);
}
  

CheckValid(group:FormGroup=this.contactform,submittedempty:boolean=false):void
{

      
     Object.keys(group.controls).forEach( (key:string)=>
     {
       const abstractcontrol=group.get(key);

        this.formerrors[key]="";

        if(submittedempty==true)
        {
           abstractcontrol.markAsDirty();
        }

        if(abstractcontrol && !abstractcontrol.valid && (abstractcontrol.dirty || abstractcontrol.touched))
        {
       
        const messages=this.validationmessages[key];

         for(const errorkey in abstractcontrol.errors)
         {
           
           if(errorkey)
           {
             this.formerrors[key]+=messages[errorkey]+" ";
             
           }
         }
         
       }
     }
     )

   

}



}





