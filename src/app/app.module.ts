import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {DatePipe} from '@angular/common';




export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,

      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient]
          }
      })
  ],
  providers: [
      AndroidPermissions,
      HttpClient,
      WifiWizard2,
      StatusBar,
      SplashScreen,
      DatePipe,

      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// Camera,
