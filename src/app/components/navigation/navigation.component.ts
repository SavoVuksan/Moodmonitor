import { Component, OnInit } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import {ResponsiveService} from '../../services/responsive.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isActive : boolean;

  constructor(public responsive: ResponsiveService) {
    this.isActive = false;
  }

  ngOnInit() {
  }

  toggleNav(){
    this.isActive = !this.isActive;

  }

}
