import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import {FormGroup,FormBuilder,Validators, AbstractControl} from '@angular/forms';
import {AllcontactsdataService} from '../allcontactsdata.service';
import { Router,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-formpopup',
  templateUrl: './formpopup.component.html',
  styleUrls: ['./formpopup.component.scss']
})
export class FormpopupComponent implements OnInit {

   @Input()  showeditform:boolean;
   @Output() showeditformChange=new EventEmitter<boolean>();

  
   
 
  contactform:FormGroup;
  formdata:object;
  routeSub:any;
  activeContactId:number;
  activeContactData:any;
  allcontactsdata:object[];
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
      'required':' (phone number is required)',
      'min':' (mobile.no should be of 10 digits)',
      'max':' (mobile.no should be of 10 digits)'
    }
  }

  formerrors=
  {
    'name':'',
    'email':'',
    'mobile':''
  }
  
  constructor(private fb:FormBuilder,private sc:AllcontactsdataService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void 
  {

          this.routeSub = this.route.params.subscribe
    (params => {
           this.activeContactId=parseInt(params['id']);
           if(isNaN(this.activeContactId))
            {
                  this.activeContactId=1; 
            }
      
    });

    this.allcontactsdata=this.sc.send_allcontacts();

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



     this.contactform.valueChanges.subscribe((value)=>
     {
       this.CheckValid();
     })
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

    

}



changeNav()
{

  this.router.navigateByUrl('/home/'+this.formdata['id']);
}
  

CheckValid(group:FormGroup=this.contactform):void
{

      
     Object.keys(group.controls).forEach( (key:string)=>
     {
       const abstractcontrol=group.get(key);
       if(abstractcontrol instanceof FormGroup)
       {
         this.CheckValid(abstractcontrol);
       }
       else
       {

        this.formerrors[key]="";

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
         
       }}
     }
     )

   

}



}





