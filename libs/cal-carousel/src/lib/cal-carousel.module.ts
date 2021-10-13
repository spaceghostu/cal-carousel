import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalCarouselComponent } from './cal-carousel/cal-carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalCarouselSlideComponent } from './cal-carousel-slide/cal-carousel-slide.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, MatIconModule],
  declarations: [
    CalCarouselComponent,
    CalCarouselSlideComponent
  ],
  exports: [
    CalCarouselComponent,
    CalCarouselSlideComponent
  ]
})
export class CalCarouselModule { }
