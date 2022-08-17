import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  private user = {
    username: 'sarah',
    password: 'connor'
  }

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.signIn();
  }

  signIn(){
    this._authService.signIn(this.user).subscribe(
      response => {
        localStorage.setItem('token', response.token);
      },
      error => {
        console.log(error);
      }
    )
  }

}
