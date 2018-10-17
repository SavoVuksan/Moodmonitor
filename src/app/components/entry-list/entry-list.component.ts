import { Component, OnInit } from '@angular/core';
import {Entry} from '../../classes/entry';
import {SharedVarsService} from '../../services/shared-vars.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {




  constructor(public sharedVars: SharedVarsService,private router: Router) {

  }

  ngOnInit() {
  }

  goToEntry(entry: Entry){
    this.sharedVars.selectedDay = entry.date;
    this.sharedVars.selectedEntry = entry;

    this.router.navigateByUrl('readMood');
  }
}
