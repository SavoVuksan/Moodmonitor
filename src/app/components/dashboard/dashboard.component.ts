import { Component, OnInit } from '@angular/core';
import {RestServiceService} from '../../services/rest-service.service';

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

  constructor(private rest:RestServiceService) {

  }

  ngOnInit() {

    this.rest.getPosDays().subscribe((data) =>{
      this.posDays = data['posDays'];
    });

    this.rest.getNegDays().subscribe((data) =>{
      this.negDays = data['negDays'];
    });

    this.rest.getLastMood().subscribe((data) =>{
      this.lMMoodText = data['moodText'];
      let pE = data['posEmotions'];
      let nE = data['negEmotions'];
      if(pE.length > 0){
        if(nE.length > 0){
          this.lMDayType = 0;
        }else{
          this.lMDayType = 1;
        }
      }else{
        this.lMDayType = -1;
      }
    });
  }

}
