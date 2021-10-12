import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalCarouselSlideDirective } from './cal-carousel-slide.directive';
import { CalCarouselComponent } from './cal-carousel/cal-carousel.component';

@NgModule({
  imports: [CommonModule],
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
