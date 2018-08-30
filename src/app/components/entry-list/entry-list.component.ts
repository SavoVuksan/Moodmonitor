import { Component, OnInit } from '@angular/core';
import {Entry} from '../../classes/entry';
import {SharedVarsService} from '../../services/shared-vars.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {




  constructor(public sharedVars: SharedVarsService) {

  }

  ngOnInit() {
  }

}
