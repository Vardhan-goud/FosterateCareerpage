import { Component, OnInit } from '@angular/core';
import { ContactsdataService } from '../../services';
import { Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Contact} from 'src/app/careers/contactdefinition.model';


@Component({
  selector: 'app-allcontactsview',
  templateUrl: './allcontactsview.component.html',
  styleUrls: ['./allcontactsview.component.scss']
})
export class AllcontactsviewComponent implements OnInit {

  
  allContacts:Contact[];
  activeContactId:number;
  activehref:string="";

  constructor(private sc:ContactsdataService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void
  {

      this.allContacts=this.sc.allcontacts;

     this.activehref=this.router.url;

      this.route.params.subscribe
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

