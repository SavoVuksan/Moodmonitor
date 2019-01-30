import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '../../services/responsive.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = "Username";
  email: string = "Email";
  password: string;
  repeatPw: string;

  constructor(private router: Router, public responsive:ResponsiveService) { }

  ngOnInit() {
  }

  submit(){
    //Auf Doppelte überprüfen
    if(this.password == this.repeatPw)
    this.router.navigateByUrl("/login");
  }

  toLogin(){
    this.router.navigateByUrl("/login");
  }

}
