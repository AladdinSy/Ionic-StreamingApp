import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ModelPageComponent } from './model-page/model-page.component';
import { SliderComponent } from './slider/slider.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CardComponent, ModelPageComponent, SliderComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [CardComponent, ModelPageComponent, SliderComponent],
})
export class ProjectComponentModule {}
