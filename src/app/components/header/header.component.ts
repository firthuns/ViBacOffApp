import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  @Input() titulo = '';
  nombre = window.sessionStorage.getItem('nombre');
  apellidos = window.sessionStorage.getItem('apellidos');

  constructor(private authService: AuthService) { }

  ngOnInit() {}

    logOut() {
        this.authService.logout();
    }
}
