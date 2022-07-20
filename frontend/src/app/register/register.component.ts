import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUserData = { email: '', password: '' };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  registerUser() {
    this.authService.registerURL(this.registerUserData)
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
        complete: () => console.log('response')
      });
  }

}
