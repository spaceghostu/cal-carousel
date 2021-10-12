import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[calCarouselSlide]'
})
export class CalCarouselSlideDirective {

  constructor(public elem: ElementRef) { }

}
