import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {


  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {
  }
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/public/login/'], { relativeTo: this.route });
      return false;
    }
  }
}
