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
      this.posEmotions = data as Array<Emotion>;

      this.posEmotions.map((value) =>{
        if(this.sharedVars.selectedEntry.positiveEmotions.find((val) =>{

          return val._id === value._id;
        })){
          value.isActive = true;
        }
        return value;
      });

    });

    this.rest.getNegativeEmotions().subscribe((data) =>{
          this.negEmotions = data as Array<Emotion>;


      this.negEmotions.map((value) =>{

        if(this.sharedVars.selectedEntry.negativeEmotions.find((val) =>{
          return val._id === value._id;
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
    let pos = '';
    this.getEmotions(this.sharedVars.avaiablePositiveEmotions,this.sharedVars.selectedEntry.positiveEmotions).forEach(e => {
      pos += e.name + ' ';
    });

    //Array negativer Emotionen zu String umwandeln
    let neg = '';
    this.getEmotions(this.sharedVars.avaiableNegativeEmotions,this.sharedVars.selectedEntry.negativeEmotions).forEach(e => {
      neg += e.name +' ';
    })

    let text = this.sharedVars.selectedEntry.text;
    let tagstring = this.sharedVars.selectedEntry.tags;



    let file = day + "\n" +
               title +
               "\n \n Positive Emotions: " + pos +
               "\n Negative Emotions: " + neg +
               "\n \n" + text +
               "\n Tags: " + tagstring;
    let filename = title+".txt";
    this.saveService.saveText(file, filename);
  }

  /**
   * Gibt die Emotionen zurück die Selektiert sind
   * @param aviableList Alle verfügbaren emotionen
   * @param selectedList Selektierte emotionen
   */
  getEmotions(aviableList: Array<Emotion>, selectedList: Array<Emotion>): Array<Emotion>{
    return aviableList.filter(e => {
      let k = false;
      selectedList.forEach(s =>{
        if(e._id === s._id){
          k = true;
          return k;
        }
      });
      return k;
    });
  }
}
