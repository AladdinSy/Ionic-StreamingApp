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
  slidePerView: number = 1;

  constructor(public platform: Platform) {}

  ngOnInit() {
    this.platformCheck();
    this.platform.resize.subscribe(async () => {
      this.platformCheck();
    });
  }

  platformCheck() {
    if (this.platform.width() < 427) {
      this.slideOpts = {
        spaceBetween: 2,
        slidesPerView: 1,
      };
      this.slidePerView = 1;
      this.isSmallSizeScreen = true;
    } else if (this.platform.width() < 640 && this.platform.width() > 427) {
      this.slideOpts = {
        spaceBetween: 2,
        slidesPerView: 1.4,
      };
      this.slidePerView = 1.4;
      this.isSmallSizeScreen = true;
    } else if (this.platform.width() < 854 && this.platform.width() > 640) {
      this.slideOpts = {
        spaceBetween: 2,
        slidesPerView: 2,
      };
      this.slidePerView = 2;
      this.isSmallSizeScreen = true;
    } else if (this.platform.width() < 1200 && this.platform.width() > 854) {
      this.slideOpts = {
        spaceBetween: 1,
        slidesPerView: 3.2,
      };
      this.slidePerView = 3.2;
      this.isSmallSizeScreen = true;
    } else if (this.platform.width() < 1300 && this.platform.width() > 1200) {
      this.slideOpts = {
        spaceBetween: 2,
        slidesPerView: 1,
      };
      this.slidePerView = 1;
      this.isSmallSizeScreen = false;
    } else {
      this.isSmallSizeScreen = false;
      this.slidePerView = 1.5;
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
