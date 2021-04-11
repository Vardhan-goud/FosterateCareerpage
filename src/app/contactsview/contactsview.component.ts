import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import {AllcontactsdataService} from '../allcontactsdata.service';
import { Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contactsview',
  templateUrl: './contactsview.component.html',
  styleUrls: ['./contactsview.component.scss']
})
export class ContactsviewComponent implements OnInit {



   contact_list:any;
   activeContactId:number;
   routeSub:any;
   activehref:string="";
    
    

   

 

  constructor(private allcontactsinst:AllcontactsdataService,private router:Router,private route: ActivatedRoute)
  {
    
  };

  ngOnInit(): void
   {

       this.contact_list=this.allcontactsinst.send_allcontacts();

      this.activehref=this.router.url;

        this.routeSub = this.route.params.subscribe
        (params => 
          {
              this.activeContactId=parseInt(params['id']);

                       if(isNaN(this.activeContactId))
                           {
                                this.activeContactId=1;
                                if(this.activehref=="/add")
                                     {
                                          this.activeContactId=0;
                                       }
                            }
      
         });
  };

 ngOnChanges():void{}



  showid(val:number)
  {
    
    this.router.navigateByUrl('/home/'+val);

  }



  
}
