import { Component } from '@angular/core';
import { Router} from '@angular/router';
import {IonTabs} from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor( private router: Router) {}

    borrarIdEquipo() {
      window.sessionStorage.setItem('id', 'null');
    }


  borrarFormulario() {

  }

}
