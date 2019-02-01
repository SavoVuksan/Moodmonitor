import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';
import {SharedVarsService} from '../../services/shared-vars.service';
import {Entry} from '../../classes/entry';
import {Router} from '@angular/router';
import {ResponsiveService} from '../../services/responsive.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  posDays: number;
  negDays: number;

  lMDayType: number;
  lMMoodText: string;

  private entry: Entry;

  public isMobile;

  public search: boolean;

  constructor(private rest:RestService, private sharedVars:SharedVarsService, private router: Router, public responsive:ResponsiveService) {

  }

  ngOnInit() {
    this.entry = new Entry(new Date());

    this.rest.getGoodDayCount().subscribe((data) =>{
      this.posDays = data['goodDayCount'];
    });

    this.rest.getBadDayCount().subscribe((data) =>{
      this.negDays = data['badDayCount'];
    });

    this.rest.getLastCreatedEntry().subscribe((data) =>{
      if(data) {
        this.entry = new Entry(data['createdOn']);
        this.entry.text = data['text'];
        this.entry.tags = data['tags'];
        this.entry.title = data['title'];
        this.entry.positiveEmotions = data['positiveEmotions'];
        this.entry.negativeEmotions = data['negativeEmotions'];
        if (this.entry.positiveEmotions.length > 0) {
          if (this.entry.negativeEmotions.length > 0) {
            this.lMDayType = 0;
          } else {
            this.lMDayType = 1;
          }
        } else {
          this.lMDayType = -1;
        }
      }
    });
  }

  routeToLastMood(){
    this.sharedVars.setSelectedEntry(this.entry);


    this.router.navigateByUrl('/readMood');
  }

}
