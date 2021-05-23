import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURl: string = environment.basdeURL;

  constructor( private http: HttpClient , private router: Router, private route: ActivatedRoute) { }


  login(e: string, p: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const json = JSON.stringify({username: e, password: p});
    return this.http.post(this.baseURl + 'users/login_check', json, {headers} );

  }


  getToken(): any {
    return window.sessionStorage.getItem('token');
  }
  loggedIn(): any {
    return window.sessionStorage.getItem('token');
  }
  logout(): any {
    window.sessionStorage.removeItem('token');
    return this.router.navigate(['/public/login/'], { relativeTo: this.route });
  }
}
