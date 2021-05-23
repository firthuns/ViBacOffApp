import {Component, ContentChild, OnInit, ViewChild, ElementRef} from '@angular/core';
import {IonInput, IonSlides, NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  // ojo pass
  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;
  passwordTypeInput  =  'password';

  miFormulario: FormGroup = this.fb.group( {
    email: ['eduard.sanz@vibacoff.com', [Validators.required, Validators.email]],
    password: ['password', [Validators.required, Validators.minLength(6)]],
  });

  usuario: any[] = [];



  constructor( private  fb: FormBuilder,
               private router: Router,
               private NavCtrl: NavController,
               private authService: AuthService
  ) {
    window.sessionStorage.removeItem('idCliente');
    window.sessionStorage.removeItem('nombre');
    window.sessionStorage.removeItem('apellidos');
    window.sessionStorage.removeItem('token');
  }

  ngOnInit() {
    // this.slides.lockSwipes( true );
  }



  login(): any {



    console.log(this.miFormulario.value.email, this.miFormulario.value.password);
    // ir al backend y verificar que el usuario existe
    this.authService.login(this.miFormulario.value.email, this.miFormulario.value.password)
        .subscribe((resp: any) => {
          console.log('respesta login:', resp);
          // const id = resp.cliente.id;
          const {id, nombre, apellidos} = resp.cliente;
          this.usuario.push(resp.cliente);
          // console.log('cliente []', this.usuario);
          // console.log('cliente', nombre, apellidos, id);

          if (resp.token) {
            console.log('idcliente', id);
            window.sessionStorage.setItem('idCliente', this.usuario[0].id);
            window.sessionStorage.setItem('nombre', this.usuario[0].nombre);
            window.sessionStorage.setItem('apellidos', this.usuario[0].apellidos);
            window.sessionStorage.setItem('token', resp.token);
            this.router.navigate(['tabs']);

          }
        }, (error: any) => {
          console.log( error);
          Swal.fire('', 'Error al iniciar sesión', 'warning');
        } );


  }



  togglePasswordMode() {
    // cambiar tipo input
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    // obtener el input
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    // obtener el indice de la posición del texto actual en el input
    const inputSelection = nativeEl.selectionStart;
    // ejecuto el focus al input
    nativeEl.focus();
    // espero un milisegundo y actualizo la posición del indice del texto
    setTimeout(() => {
      nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);

  }


  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

}
