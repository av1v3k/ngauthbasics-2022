import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserData = { email: '', password: '' }
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.authService.loginUser(this.loginUserData)
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
        complete: () => console.log('response completed')
      });
  }

}
