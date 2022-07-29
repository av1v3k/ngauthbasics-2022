import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserData = { email: '', password: '' }
  constructor(private authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.authService.loginUser(this.loginUserData)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem(`token`, res ? res.token : ``);
          this._router.navigate(["/special"]);
        },
        error: (err) => console.log(err),
        complete: () => console.log('response completed')
      });
  }

}
