import { Component, OnInit } from '@angular/core';
import {Emotion} from '../../classes/emotion';

@Component({
  selector: 'app-write-mood',
  templateUrl: './write-mood.component.html',
  styleUrls: ['./write-mood.component.css']
})
export class WriteMoodComponent implements OnInit {

  testDataPos : Emotion[];
  testDataNeg : Emotion[];

  tags: string;
  moodText: string;

  constructor() {
    this.tags = '';
    this.moodText = '';

    this.testDataPos = [new Emotion('Happy', false)
      ,new Emotion('Proud', false)
      , new Emotion('Free', false)
      , new Emotion('Satisfied', false)
      , new Emotion('Cheerful', false)];

    this.testDataNeg = [
      new Emotion('Sad', false)
      ,new Emotion('Angry', false)
      ,new Emotion('Frustrated', false)
      ,new Emotion('Self conscious', false)
      ,new Emotion('Tired', false)
      ,
    ];
  }

  ngOnInit() {

  }

}
