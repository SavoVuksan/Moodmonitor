import { Component, OnInit } from '@angular/core';
import {SharedVarsService} from '../../services/shared-vars.service';
import {Emotion} from '../../classes/emotion';
import {RestService} from '../../services/rest.service';
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



  constructor(public sharedVars: SharedVarsService, public rest: RestService, public responsive: ResponsiveService,
              private saveService: FileSaverService) {

    this.posEmotions = new Array();
    this.negEmotions = new Array();

    this.rest.getPositiveEmotions().subscribe((data) =>{
      data[0]['positiveEmotions'].forEach((val) =>{
        this.posEmotions.push(new Emotion(val,false));
      });

      this.posEmotions.map((value) =>{

        if(this.sharedVars.selectedEntry.posEmotions.find((val) =>{
          return val.name.toLowerCase() === value.name.toLowerCase();
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
          return val.name.toLowerCase() === value.name.toLowerCase();
        })){
          value.isActive = true;
        }
      });
    });



  }

  ngOnInit() {
  }

  export(){
    //Tag und Titel als String speichern
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

    //Text und Tags in Strings speichern
    let text = this.sharedVars.selectedEntry.moodText;
    let tagstring = this.sharedVars.selectedEntry.tags;
    let tags = "#"+tagstring.replace(" ", " #");

<<<<<<< HEAD
    //Fileinhalt aus Strings zusammenfügen
    let file = day + "\n" + 
               title + 
               "\n \n Positive Emotions: " + pos + 
=======

    let file = day + "\n" +
               title +
               "\n \n Positive Emotions: " + pos +
>>>>>>> 9cf46f17fa9f875a4306e5929117a3b5e272ed64
               "\n Negative Emotions: " + neg +
               "\n \n" + text +
               "\n Tags: " + tags;
    //Namen des Titels bestimmen
    let filename = title+".txt";
    //File speichern
    this.saveService.saveText(file, filename);
  }
}
