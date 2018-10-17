import { Component, OnInit } from '@angular/core';
import {SharedVarsService} from '../../services/shared-vars.service';
import {Emotion} from '../../classes/emotion';
import {RestServiceService} from '../../services/rest-service.service';
import {ResponsiveService} from '../../services/responsive.service';

@Component({
  selector: 'app-read-mood',
  templateUrl: './read-mood.component.html',
  styleUrls: ['./read-mood.component.css']
})
export class ReadMoodComponent implements OnInit {

  posEmotions: Emotion[];
  negEmotions: Emotion[];



  constructor(public sharedVars: SharedVarsService,public rest: RestServiceService, public responsive: ResponsiveService) {

    this.posEmotions = new Array();
    this.negEmotions = new Array();

    this.rest.getPositiveEmotions().subscribe((data) =>{
      data[0]['positiveEmotions'].forEach((val) =>{
        this.posEmotions.push(new Emotion(val,false));
      });

      this.posEmotions.map((value) =>{

        if(this.sharedVars.selectedEntry.posEmotions.find((val) =>{
          return val.name === value.name;
        })){
          value.isActive = true;
        }
      });

    });

    this.rest.getNegativeEmotions().subscribe((data) =>{
      data[0]['negativeEmotions'].forEach((val) =>{
        this.negEmotions.push(new Emotion(val,false));
      });

      this.negEmotions.map((value) =>{

        if(this.sharedVars.selectedEntry.negEmotions.find((val) =>{
          return val.name === value.name;
        })){
          value.isActive = true;
        }
      });
    });



  }

  ngOnInit() {
  }

}
