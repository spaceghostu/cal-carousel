import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'cal-carousel-slide',
  templateUrl: './cal-carousel-slide.component.html',
  styleUrls: ['./cal-carousel-slide.component.scss']
})
export class CalCarouselSlideComponent implements AfterViewInit {

  @Input() minScale = 0.5;
  @Input() proximity = 400;
  containerCenter = 0;

  watchId = 0;

  @ViewChild('container') containerRef!: ElementRef;

  set scale(value: number) {
    this.containerRef.nativeElement.style.transform = `scale(${value})`;
  }

  constructor(public elem: ElementRef) { }

  ngAfterViewInit() {
    this.setScale();
  }

  stopWatchPosition() {
    cancelAnimationFrame(this.watchId);
  }

  scaleValue(value: number) {
    const from = [0, this.proximity];
    const to = [100, this.minScale * 100];
    const scale = (to[1] - to[0]) / (from[1] - from[0]);
    const capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
    const result = (~~(capped * scale + to[0])) / 100;
    if (isNaN(result)) return 1;
    return result;
  }

  watchPosition() {
    this.setScale();
    this.watchId = requestAnimationFrame(() => this.watchPosition());
  }

  setScale() {
    const rect = this.elem.nativeElement.getBoundingClientRect();
    const diff = Math.abs(this.containerCenter - rect.x);
    const scale = this.scaleValue(diff);
    if (diff < this.proximity) {
      this.scale = scale;
    } else {
      this.scale = this.minScale;
    }
  }

}