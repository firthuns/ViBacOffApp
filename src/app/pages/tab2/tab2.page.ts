import {Component, OnInit, ViewChild} from '@angular/core';

import Swal from 'sweetalert2';
import {FormGroup} from '@angular/forms';
import {AlertController, IonInfiniteScroll, IonList,  LoadingController, ToastController} from '@ionic/angular';

import {Router} from '@angular/router';
import {EquipoService} from '../../services/equipo.service';

export interface Usuario {
  id: string;
  name: string;
  email: string;
}



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  equipos: any[] = [];
  id: any;
  Usuario: Usuario[] = [];

  equipo!: FormGroup;
  idCliente = '';
  idEquipo = '';
  @ViewChild(IonList) ionList: IonList;

  // infinite scroll
  data: any[] = Array(20);
  @ViewChild( IonInfiniteScroll ) inifiteScroll: IonInfiniteScroll;

  loading: HTMLIonLoadingElement; // loading



  constructor( private equipoService: EquipoService,
               private router: Router,
               private alertCtrl: AlertController,
               private toastCtrl: ToastController,
               private loadingCtrl: LoadingController) {
    window.sessionStorage.removeItem('id');
    this.idCliente = sessionStorage.getItem('idCliente');

    // this.mostrarLoading();

  }

  ngOnInit() {
    this.getEquipos();

    // console.log('Usuario', this.Usuario);
  }

  getEquipos(): void {
    this.equipoService.getEquipos( this.idCliente  )
        .subscribe( (resp: any ) => {
          this.equipos = resp;

          console.log('listado equipos', this.equipos );
        });
  }
  doRefresh( event ) {

    setTimeout(() => {
   this.getEquipos();
   event.target.complete();
    }, 500);

  }


  mostrarLoading() {
    this.presentLoading('Espere un momento');

    setTimeout(() => {
      this.loading.dismiss();
    }, 1000);
  }

  async presentLoading( message: string) {

    this.loading = await this.loadingCtrl.create({
      message,
    });

    await this.loading.present();

  }

  descargarFactura(factura: any) {

    const url = 'https://api.vibacoff.com/';

    window.open(url + factura);
    this.ionList.closeSlidingItems();
  }

  loadData( event ) {

    // console.log(event);

    setTimeout(() => {

      if ( this.data.length > 50 ) {
        this.inifiteScroll.complete();
        this.inifiteScroll.disabled = true;
        return;
      }

      const nuevoArr = Array(20);
      this.data.push( ...nuevoArr );

      // event.target.complete();
      this.inifiteScroll.complete();
    }, 500);

  }


  editar(id: string) {
    window.sessionStorage.setItem('id', id);

    this.router.navigate(['tabs/editar']);
    // window.location.reload();
    this.ionList.closeSlidingItems();
    }

 async delete(id) {

    const alert = await this.alertCtrl.create({
      header: 'Borrando dispositivo',
      message: 'vas a borrar el dispositivo id:' + id,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        },
        {
          text: 'Borrar',
          handler: () => {
            console.log('click borrar!');
            this.equipoService.borrarEquipo(id)
              .subscribe(() => {
                this.presentToast('Registro eliminado');
                this.mostrarLoading();
                this.getEquipos();
              });
          },
          cssClass:  'rojo'
        }
      ]


    });
    this.ionList.closeSlidingItems();
    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}

