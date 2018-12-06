import { Component, OnInit } from '@angular/core';
import {SharedVarsService} from '../../services/shared-vars.service';
import {Emotion} from '../../classes/emotion';
import {RestServiceService} from '../../services/rest-service.service';
import {ResponsiveService} from '../../services/responsive.service';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-read-mood',
  templateUrl: './read-mood.component.html',
  styleUrls: ['./read-mood.component.css']
})
export class ReadMoodComponent implements OnInit {

  posEmotions: Emotion[];
  negEmotions: Emotion[];



  constructor(public sharedVars: SharedVarsService,public rest: RestServiceService, public responsive: ResponsiveService,
              private saveService: FileSaverService) {

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

  export(){
    let day = this.sharedVars.selectedDay.toLocaleDateString();
    let title = this.sharedVars.selectedEntry.title;

    //Array positiver Emotionen zu String umwandeln
    let pos = "";
    for(let i = 0; i < this.sharedVars.selectedEntry.posEmotions.length; i++){
      if(this.sharedVars.selectedEntry.posEmotions[i].isActive){
        if(pos == ""){
          pos = this.sharedVars.selectedEntry.posEmotions[i].name;
        }
        else{
          pos = pos +", "+ this.sharedVars.selectedEntry.posEmotions[i].name;
        }
      }
    }

    //Array negativer Emotionen zu String umwandeln
    let neg = "";
    for(let i = 0; i < this.sharedVars.selectedEntry.negEmotions.length; i++){
      if(this.sharedVars.selectedEntry.negEmotions[i].isActive){
        if(neg == ""){
          neg = this.sharedVars.selectedEntry.negEmotions[i].name;
        }
        else{
          neg = neg +", "+ this.sharedVars.selectedEntry.negEmotions[i].name;
        }
      }
    }

    let text = this.sharedVars.selectedEntry.moodText;
    let tagstring = this.sharedVars.selectedEntry.tags;
    let tags = "#"+tagstring.replace(" ", " #");


    let file = day + "\n" + 
               title + 
               "\n \n Positive Emotions: " + pos + 
               "\n Negative Emotions: " + neg +
               "\n \n" + text +
               "\n Tags: " + tags;
    let filename = title+".txt";
    this.saveService.saveText(file, filename);
  }
}
