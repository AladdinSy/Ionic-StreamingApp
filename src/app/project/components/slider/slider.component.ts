import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() sliderInputValue: any;
  @Output() sliderEventTrigger: EventEmitter<any> = new EventEmitter();
  isSmallSizeScreen: boolean;
  slideOpts = {};
  slidesPerView = 0;

  constructor(public platform: Platform) {}

  ngOnInit() {
    this.platformCheck();
    this.platform.resize.subscribe(async () => {
      this.platformCheck();
    });
  }

  platformCheck() {
    if (this.platform.width() < 480) {
      this.slideOpts = {
        spaceBetween: 2,
        slidesPerView: 1,
      };
      this.slidesPerView = 1;
      this.isSmallSizeScreen = true;
    } else if (this.platform.width() < 640 && this.platform.width() > 480) {
      this.slideOpts = {
        spaceBetween: 2,
        slidesPerView: 1.4,
      };
      this.isSmallSizeScreen = true;
    } else if (this.platform.width() < 768 && this.platform.width() > 640) {
      this.slideOpts = {
        spaceBetween: 2,
        slidesPerView: 2,
      };
      this.isSmallSizeScreen = true;
    } else if (this.platform.width() < 1200 && this.platform.width() > 768) {
      this.slideOpts = {
        spaceBetween: 1,
        slidesPerView: 3.2,
      };
      this.isSmallSizeScreen = true;
    } else if (this.platform.width() < 1300 && this.platform.width() > 1200) {
      this.slideOpts = {
        spaceBetween: 2,
        slidesPerView: 1,
      };
      this.isSmallSizeScreen = false;
    } else {
      this.isSmallSizeScreen = false;
      this.slideOpts = {
        spaceBetween: 2,
        slidesPerView: 1.5,
        freeMode: true,
      };
    }
  }

  sliderClickEventTrigger(modelValue) {
    this.sliderEventTrigger.emit(modelValue);
  }
}
