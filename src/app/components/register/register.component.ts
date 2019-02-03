import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '../../services/responsive.service';
import { Router } from '@angular/router';
import {RestService} from '../../services/rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string ;
  email: string ;
  password: string;
  repeatPw: string;

  constructor(private router: Router, public responsive:ResponsiveService, private rest:RestService) {
    this.username = '';
    this.email = '';
    this.password = '';
    this.repeatPw = '';
  }

  ngOnInit() {
  }

  submit(){
    // Wurden ein Username und eine Email eingegeben?
    if(this.username !== '' && this.email !== ''){
      // Sind Passwort und das wiederholte Passwort gleich?
      if(this.password === this.repeatPw){
        // Auf Doppelte überprüfen
        this.rest.register({
          username: this.username,
          email: this.email,
          password: this.password,
          password2: this.repeatPw
        }).subscribe(data => {
          console.log(`Registered? ${data}`);
          this.router.navigateByUrl("/login");
        });
      }
    }

  }

  toLogin(){
    this.router.navigateByUrl("/login");
  }

}
