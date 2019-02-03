import { Component, OnInit } from '@angular/core';
import {Entry} from '../../classes/entry';
import {SharedVarsService} from '../../services/shared-vars.service';
import {Router} from '@angular/router';
import {ResponsiveService} from '../../services/responsive.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {




  constructor(public sharedVars: SharedVarsService,private router: Router,public responsive: ResponsiveService) {

  }

  ngOnInit() {
  }

  goToEntry(entry: Entry){
    console.log(entry);
    this.sharedVars.setSelectedEntry(entry);

    this.router.navigateByUrl('readMood');
  }
}
