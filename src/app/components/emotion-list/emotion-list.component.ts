import {Component, Input, OnInit} from '@angular/core';
import {Emotion} from '../../classes/emotion';

@Component({
  selector: 'app-emotion-list',
  templateUrl: './emotion-list.component.html',
  styleUrls: ['./emotion-list.component.css']
})
export class EmotionListComponent implements OnInit {
  @Input()
  editable: boolean;

  @Input()
  emotionType: string;
  @Input()
  emotions: Emotion[];

  constructor() { }

  ngOnInit() {
  }

}
