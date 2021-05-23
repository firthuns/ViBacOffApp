import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {EquipoService} from '../../services/equipo.service';

import {ActivatedRoute, Router} from '@angular/router';


import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import Swal from 'sweetalert2';

import { Plugins, CameraResultType, Capacitor, FilesystemDirectory,
    CameraPhoto, CameraSource } from '@capacitor/core';
import {PhotoService} from '../../services/photo.service';

const { Camera, Filesystem, Storage } = Plugins;


@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

    photo: SafeResourceUrl;

    facturaNombre = '';
    facturaSinModificar = ''; // en esta varibale guardaremos la factura sin modificar
    datosEquipo!: FormGroup;

    cliente = '';
    idEquipo = '';
    fechaCompra: Date = new Date();

    equipo: any[] = [];
    cadena1: string[] = [];
    files: any[] = [];


    // private camera: Camera,
    constructor(private fb: FormBuilder,
                private equipoService: EquipoService,
                private activatedRoute: ActivatedRoute,
                private sanitizer: DomSanitizer,
                private date: DatePipe,
                private router: Router,
                public photoService: PhotoService) {
        this.crearFormulario();
    }

    async ngOnInit() {


        this.cliente = JSON.parse(window.sessionStorage.getItem('idCliente') as string);
        await this.photoService.loadSaved();
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

    cambioFecha(event) {

        console.log(event);
        console.log(new Date(event.detail.value));

    }




    limpiarfactura(f: string): any {
        console.log('factura:', f);

        this.cadena1 = f.split('/');
        // console.log( this.cadena);


    }

/*  ZONA CAMARA FOTOS*/
    async takePicture() {

         const image = await Plugins.Camera.getPhoto({

            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera
        });
         this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));


    }

    addPhotoToGallery() {
        this.photoService.addNewToGallery();
    }

    /*  ZONA CAMARA FOTOS   */

    guardarEquipo() {
        const fecha = this.date.transform(this.datosEquipo.value.fechaCompra, 'yy-MM-dd');
        console.log(fecha);
        console.log(this.cliente);
        console.log(this.datosEquipo.value.serial);
        console.log(this.datosEquipo.value.lugarInstalacion);
        console.log(this.photo);

        const formData = new FormData();
        formData.append('idCliente', this.cliente);
        formData.append('serial', this.datosEquipo.value.serial);
        formData.append('fechaCompra', '' + fecha);
        formData.append('ubicacion', this.datosEquipo.value.lugarInstalacion);


        // @ts-ignore
        formData.append('factura', this.photo);

        this.equipoService.agregarEquipo(formData).subscribe(() => {
                Swal.fire('', 'Datos Guardados', 'success');
                this.router.navigate(['/tabs/listado']);
            },
            (error) => {
                console.log(error);
                Swal.fire('', 'Error al guadar', 'warning');
            });

    }
}
