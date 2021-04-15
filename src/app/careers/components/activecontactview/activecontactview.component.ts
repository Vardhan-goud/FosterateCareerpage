import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsdataService } from '../../services';
import {Contact} from 'src/app/careers/contactdefinition.model';

@Component({
  selector: 'app-activecontactview',
  templateUrl: './activecontactview.component.html',
  styleUrls: ['./activecontactview.component.scss']
})
export class ActivecontactviewComponent implements OnInit {

  activeContactId:number;
  activeContactData:Contact;

 

  constructor(private sc:ContactsdataService,private route:ActivatedRoute,) {
    
   }

   ngOnInit(): void {

    this.activeContactData=this.sc.allcontacts[0];
    this.route.params.subscribe(params => {
      
      this.activeContactId=parseInt(params['id']);

      if(isNaN(this.activeContactId))
      {
        this.activeContactId=1;
      }
     
      this.activeContactData=this.sc.sendActiveContact(this.activeContactId);

    });
  }
}
