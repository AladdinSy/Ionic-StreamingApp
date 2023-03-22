import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ModelPageComponent } from './model-page/model-page.component';
import { SliderComponent } from './slider/slider.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CardComponent, ModelPageComponent, SliderComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [CardComponent, ModelPageComponent, SliderComponent],
})
export class ProjectComponentModule {}
