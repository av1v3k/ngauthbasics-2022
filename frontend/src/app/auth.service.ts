import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerurl = `http://localhost:3000/api/register`;
  private _loginurl = `http://localhost:3000/api/login`;
  constructor(private http: HttpClient, private _router: Router) { }


  registerURL(user: any){
    return this.http.post(this._registerurl, user);
  }

  loginUser(user: any){
    return this.http.post(this._loginurl, user);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/events']);
  }
}
