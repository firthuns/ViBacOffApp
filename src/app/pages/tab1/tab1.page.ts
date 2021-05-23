import {Component, ViewChild} from '@angular/core';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
import {AlertController, IonToggle, LoadingController, Platform} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Datos} from '../../modelos/Datos';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private SSID = 'vibacoff';
  private PASS = 'VibaC1234';
  private  loading: any;
  public results = [];
  public connected = false;
  public aforoMax: number;
  public nivelGel: number;
  nivelBateria: number;
  logoStyle: 'disconnected';
  aforoActual = 20;
  sensor = true;
  public datosIniciales: Datos;

  @ViewChild('sensor1') sensor1: IonToggle;
  @ViewChild('sensor2') sensor2: IonToggle;

  constructor(private wifiWizard2: WifiWizard2, public platform: Platform, private loadingController: LoadingController,
              public alertController: AlertController, private http: HttpClient) {
    if (this.platform.is('android')) {
      wifiWizard2.requestPermission();
    }
    this.nivelGel = 0.5;
    this.nivelBateria = 0.75;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ERROR',
      message: 'Can\'t Connect to Device.',
      buttons: ['OK']
    });

    await alert.present();
  }

  ionViewWillLeave(){
    console.log('SALIENDO');
    this.disConnectWifi();
  }

  async connectWifi() {
    try {
      this.loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Connecting...'
      });
      this.loading.present();
      if (this.platform.is('ios')) {
        await this.wifiWizard2.iOSConnectNetwork(this.SSID, this.PASS);

      } else if (this.platform.is('android')) {
        await this.wifiWizard2.connect(this.SSID, true, this.PASS, 'WPA');
      }
      this.connected = true;
      await this.http.get('http://192.168.4.1/').subscribe(
          datos => {
            console.log('DATOS SERVER: ', datos);
            // @ts-ignore
            this.aforoActual = datos.pasos;
            // @ts-ignore
            this.nivelBateria = datos.bat;
          }
      );

    } catch (error) {
      await this.loading.dismiss();
      await this.presentAlert();
      console.log(error);
    } finally {
      await this.loading.dismiss();
    }

  }

  disConnectWifi() {
    if (this.platform.is('ios')) {
      this.wifiWizard2.iOSDisconnectNetwork(this.SSID);
    }
    else {
      this.wifiWizard2.disconnect(this.SSID);
    }
    this.connected = false;
  }

  resetGel(cantidad: number) {
  }

  changeToggle() {
    this.sensor1.checked = !this.sensor;
    this.sensor2.checked = this.sensor;
    this.sensor = !this.sensor;

    console.log('sensores', this.sensor1.checked + ' ' + this.sensor2.checked);
  }
}
