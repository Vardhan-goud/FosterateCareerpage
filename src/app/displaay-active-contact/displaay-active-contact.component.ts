import { Component, Input, OnInit } from '@angular/core';
import { AllcontactsdataService } from '../allcontactsdata.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-displaay-active-contact',
  templateUrl: './displaay-active-contact.component.html',
  styleUrls: ['./displaay-active-contact.component.scss']
})
export class DisplaayActiveContactComponent implements OnInit {

  
  activeContactId:number;
  activeContactData:any;
  allcontacts:object[];
  routeSub:any;

  constructor(private sc:AllcontactsdataService,private route: ActivatedRoute) { 

    this.allcontacts=this.sc.send_allcontacts();
  }
  
  
  ngOnInit(): void {

    this.activeContactData=this.sc.allcontacts[0];
    this.routeSub = this.route.params.subscribe(params => {
      
      this.activeContactId=parseInt(params['id']);

      if(isNaN(this.activeContactId))
      {
        this.activeContactId=1;
      }
     
      this.activeContactData=this.sc.sendActiveContact(this.activeContactId);

    });
  }

  ngOnChanges():void{
    
   
  }

}
