import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';
import {Entry} from '../../classes/entry';
import {SharedVarsService} from '../../services/shared-vars.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-entry-list',
  templateUrl: './search-entry-list.component.html',
  styleUrls: ['./search-entry-list.component.css']
})
export class SearchEntryListComponent implements OnInit {



  constructor(private vars:SharedVarsService,private router: Router) {

  }

  ngOnInit() {

  }

  viewEntry(e: Entry){
    this.vars.selectedEntry = e;
    this.vars.selectedDay = e.createdOn;
    this.router.navigateByUrl('readMood');
  }

}
