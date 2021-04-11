import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Component } from '@angular/core';
import {  OnInit,Input,Output,EventEmitter } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  activehref;
  title = 'fMockupAngular';
  constructor(private router:Router,)
  {
     
  }

 

  ngOnInit(): void {


  };

 
  


  
}





