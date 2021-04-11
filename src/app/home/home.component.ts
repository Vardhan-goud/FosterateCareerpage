import { Component, OnInit } from '@angular/core';
import { AllcontactsdataService } from '../allcontactsdata.service';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit 
{

  activeContactId:number;
  activeContactData:any;
  routeSub:any;
  showEditForm:boolean=false;
  isempty:boolean=false;
  displayicons:boolean=true;

  constructor(private sc:AllcontactsdataService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void
  {
      
    this.routeSub = this.route.params.subscribe
    (params => {
          this.activeContactId=parseInt(params['id']);
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


  editfunc()
  {

    
    this.showEditForm=true;

  }

  deletefunc(val?:number)
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
