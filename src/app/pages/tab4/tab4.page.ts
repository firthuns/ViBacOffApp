import {Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EquipoService} from '../../services/equipo.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {LoadingController} from '@ionic/angular';

declare var window: any;

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit, OnDestroy {

  facturaNombre = '';
  facturaSinModificar = ''; // en esta varibale guardaremos la factura sin modificar
  datosEquipo!: FormGroup;

  cliente = '';
  idEquipo = '';
  fechaCompra: Date = new Date();

  equipo: any[] = [];
  cadena: string[] = [];
  files: any[] = [];

  tempImages: string[] = [];





  constructor( private fb: FormBuilder,
               private equipoService: EquipoService,
               private router: Router,
               private  date: DatePipe) {
    this.cliente = JSON.parse(window.sessionStorage.getItem('idCliente') as string);
    this.idEquipo = JSON.parse(window.sessionStorage.getItem('id') as string);

    this.crearFormulario();
    console.log('constructor');


    // window.location.href = window.location.href;

    // setTimeout( () => {
    //   window.location.reload();
    // }, 1);

  }

  ngOnInit() {


    if (this.idEquipo !== null) {


      this.getEquipo();

    }

    console.log('ngOnInit');
  }






  cambioFecha( event ) {

    console.log(event);
    console.log( new Date( event.detail.value ) );

  }
  crearFormulario(): any {

    console.log('CrearFormulario: ', this.idEquipo);
    this.datosEquipo = this.fb.group({
      id: [''],
      idCliente: [''],
      serial: ['', Validators.required],
      lugarInstalacion: ['', Validators.required],
      fechaCompra: [''],
      factura: ['']
    });
  }


  getEquipo(): any {
    this.equipoService.getEquipo(this.idEquipo).subscribe((resp: any) => {
      this.equipo = resp[0];
      console.log('respuesta', resp);

      this.cargarformulario(this.equipo);
    });
  }

  cargarformulario(datos: any): any {

    this.limpiarfactura(datos.factura);

    this.datosEquipo.controls.id.setValue(datos.id);
    this.datosEquipo.controls.idCliente.setValue(datos.idCliente);
    this.datosEquipo.controls.serial.setValue(datos.serial);
    this.datosEquipo.controls.lugarInstalacion.setValue(datos.ubicacion);
    this.datosEquipo.controls.fechaCompra.setValue(datos.fechaCompra);

    this.datosEquipo.controls.factura.setValue(this.cadena[3].toString());

    this.files.push(datos.factura);



    this.facturaSinModificar = datos.factura;
    console.log('cargRFORMULARIO', datos.factura);
  }


  limpiarfactura(f: string): any {
    console.log('factura:', f);

    this.cadena = f.split('/');
    console.log('cadena',  this.cadena[3]);


  }


  guardar() {



      const fecha = this.date.transform( this.datosEquipo.value.fechaCompra, 'yy-MM-dd');

      const formData = new FormData();
      formData.append('id', this.idEquipo);
      formData.append('idCliente', this.cliente);
      formData.append('serial', this.datosEquipo.value.serial);
      formData.append('fechaCompra', '' + fecha);
      formData.append('ubicacion', this.datosEquipo.value.lugarInstalacion);

      console.log('update', this.datosEquipo.value);
    // actualizamos valores
      this.equipoService.actualizarEquipo(formData)
        .subscribe(() => {

          sessionStorage.removeItem('id');


          this.router.navigate(['tabs/listado']);
        });
  }

  ngOnDestroy(): void {

    console.log('Borrar formulario');
  }



}
