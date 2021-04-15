import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

import {Contact} from 'src/app/careers/contactdefinition.model';
import { ContactsdataService } from '../../services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  activeContactId:number;
  activeContactData:Contact;

  showEditForm:boolean=false;
  isempty:boolean=false;
  displayicons:boolean=true;
 

  constructor(private sc:ContactsdataService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void
  {
      
   this.route.params.subscribe
    (params => {

          this.activeContactId=parseInt(params['id']);

          if(this.sc.sendActiveContact(this.activeContactId)==null)
          {
            this.isempty=true;
          }
           if(isNaN(this.activeContactId))
           {
             
              if(this.sc.allcontacts.length==0)
               {
                   this.deletefunc();
               }
               else
               {
                this.activeContactId=1;
                this.router.navigateByUrl('/home/1');
               }

           }
           
    }
    );
  }


  editfunc():void
  {

    
    this.showEditForm=true;

  }

  deletefunc(val?:number):void
  {
    if(val==1)
    {
      this.isempty=true;
      this.router.navigateByUrl("/home");
    }
    
    this.sc.removeData(this.activeContactId);

    if(this.sc.allcontacts.length>=1)
    {
      this.router.navigateByUrl("/home/"+this.sc.allcontacts[0].id);
    }

    if(this.sc.allcontacts.length==0)
    {
      this.isempty=true;
      this.router.navigateByUrl("/home");
    }

  }

}

