import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import {HeaderComponent} from '../../components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    HeaderComponent
  ],
  declarations: [Tab4Page, HeaderComponent]
})
export class Tab4PageModule {}
