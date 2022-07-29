import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface IToken {
  token: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUserData = { email: '', password: '' };

  constructor(private authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this.authService.registerURL(this.registerUserData)
      // .subscribe(res => console.log(res), err);
      .subscribe((res: any) => {
        localStorage.setItem(`token`, res ? (res.token ? res.token : '') : '');
        this._router.navigate(["/special"]);
      });
    // .subscribe({
    //   next: (res: any) => {
    //     localStorage.setItem(`token`, res.token);
    //   },
    //   error: (err) => console.log(err),
    //   complete: () => console.log('response')
    // });
  }

}
