import { Component, OnInit } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isActive : boolean;

  constructor() {
    this.isActive = false;
  }

  ngOnInit() {
  }

  toggleNav(){
    this.isActive = !this.isActive;

  }
  print(){
    console.log('meep');
  }
}
