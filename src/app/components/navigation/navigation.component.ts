import { Component, OnInit } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import {ResponsiveService} from '../../services/responsive.service';
import {SharedVarsService} from '../../services/shared-vars.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
// TODO: Fix bug when switching between Mobile to Desktop View buttons won't react
  isActive : boolean;
  constructor(public responsive: ResponsiveService, public shared: SharedVarsService,private router:Router) {
    this.isActive = false;

  }

  ngOnInit() {

  }

  toggleNav(){
    this.isActive = !this.isActive;

  }

  logout(){
    this.shared.loggedIn = false;
    this.router.navigateByUrl('/login');
  }

}
