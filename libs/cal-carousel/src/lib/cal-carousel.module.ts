import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalCarouselSlideDirective } from './cal-carousel-slide.directive';
import { CalCarouselComponent } from './cal-carousel/cal-carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  declarations: [
    CalCarouselComponent,
    CalCarouselSlideDirective
  ],
  exports: [
    CalCarouselComponent,
    CalCarouselSlideDirective
  ]
})
export class CalCarouselModule { }
