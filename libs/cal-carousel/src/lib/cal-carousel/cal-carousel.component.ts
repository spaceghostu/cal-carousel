import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ContentChildren, ElementRef, Input, QueryList, Renderer2, ViewChild } from '@angular/core';
import { CalCarouselSlideComponent } from '../cal-carousel-slide/cal-carousel-slide.component';

@Component({
  selector: 'cal-carousel',
  templateUrl: './cal-carousel.component.html',
  styleUrls: ['./cal-carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      state('auto', style({ transform: 'translateX({{pixels}}px)' }), { params: { pixels: 0 } }),
      state('', style({ transform: 'translateX({{pixels}}px)' }), { params: { pixels: 0 } }),
      transition('* => auto', animate('500ms cubic-bezier(0.41, 0, 0.22, 0.79)')),
      transition('* => *', animate('0ms cubic-bezier(0.41, 0, 0.22, 0.79)')),
    ])
  ]
})
export class CalCarouselComponent implements AfterViewInit {

  @ViewChild('container') containerRef!: ElementRef;

  @ContentChildren(CalCarouselSlideComponent) slidesRef!: QueryList<CalCarouselSlideComponent>;

  @Input() defaultSlide = 0;

  itemWidth = 0;
  containerWidth = 0;

  isPressed = false;
  downX = 0;
  mouseX = 0;
  currentIndex = 0;
  centerPositions: number[] = [];
  pixelOffset = 0;
  animationState = { value: 'init', params: { pixels: 0 } };

  private _onMouseMoveListener: ((isTouchEvent: boolean) => void) | null = null;
  private _onMouseUpListener: (() => void) | null = null;
  private _onMouseDownListener!: () => void;

  constructor(private _renderer: Renderer2) { }

  ngAfterViewInit() {
    this.itemWidth = this.slidesRef.first.elem.nativeElement.getBoundingClientRect().width;
    this.containerWidth = this.containerRef.nativeElement.getBoundingClientRect().width;
    this._onMouseDownListener = this._renderer.listen(this.containerRef.nativeElement, 'mousedown', this.onMouseDownHandler.bind(this));
    this.slidesRef.forEach((slide, index) => {
      slide.elem.nativeElement.index = index;
      this.centerPositions[index] = -((index * this.itemWidth) + -((this.containerWidth / 2) - (this.itemWidth / 2)));
      slide.containerCenter = (this.containerWidth / 2) - (this.itemWidth / 2);
    });
    this.goto_noTween(this.centerPositions[this.defaultSlide]);
    this.currentIndex = this.defaultSlide;
    setTimeout(() => {
      this.slidesRef.forEach(slide => slide.setScale());
    }, 10);
  }

  startWatchPositions() {
    this.slidesRef.forEach(slide => slide.watchPosition());
  }

  stopWatchPositions() {
    this.slidesRef.forEach(slide => slide.stopWatchPosition());
  }

  onAnimationDone() {
    if (!this.isPressed) {
      this.stopWatchPositions();
      this.animationState = { value: '', params: { pixels: this.pixelOffset } };
    }
  }

  goto_noTween(value: number) {
    this.pixelOffset = value;
    this.animationState = { value: '', params: { pixels: value } };
  }

  gotoIndex(index: number) {
    this.currentIndex = index;
    const value = this.centerPositions[index];
    this.goto(value);
  }

  goto(value: number) {
    this.startWatchPositions();
    this.pixelOffset = value;
    this.animationState = { value: 'auto', params: { pixels: value } };
  }

  nextSlide() {
    this.startWatchPositions();
    this.animationState = { value: '', params: { pixels: this.pixelOffset } };
    this.gotoIndex(this.currentIndex + 1);
  }

  previousSlide() {
    this.startWatchPositions();
    this.animationState = { value: '', params: { pixels: this.pixelOffset } };
    this.gotoIndex(this.currentIndex - 1);
  }

  onMouseDownHandler(event: MouseEvent) {
    this.startWatchPositions();
    this.animationState = { value: '', params: { pixels: this.pixelOffset } };
    const isTouchEvent = event.type === 'touchstart';

    this._startGlobalListening(isTouchEvent);
    this.isPressed = true;

    const mouseEvent = event as MouseEvent;
    this.mouseX = mouseEvent.clientX;
    this.downX = mouseEvent.clientX;
  }

  onMouseMoveHandler(event: MouseEvent) {
    this.onMouseMove(event);
  }

  onMouseMove(event: MouseEvent) {
    if (this.isPressed) {
      const { clientX } = event as MouseEvent;
      const targetPosition = this.pixelOffset - (-clientX + this.mouseX);
      if (targetPosition < this.centerPositions[0] && targetPosition > this.centerPositions[this.centerPositions.length - 1]) {
        this.goto_noTween(targetPosition);
      }
      this.mouseX = clientX;
    }
  }

  onMouseUpHandler(event: MouseEvent) {
    const { clientX } = event;
    if (this.downX === clientX) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.gotoIndex((event.target as any).index);
    } else {
      this.gotoIndex(this.findClosest(this.pixelOffset));
    }
    if (this.isPressed) {
      this.isPressed = false;
      this._stopGlobalListening();
    }
  }

  findClosest(value: number) {
    const result = this.centerPositions.reduce((a, b) => {
      return Math.abs(b - value) < Math.abs(a - value) ? b : a;
    });
    return this.centerPositions.indexOf(result);
  }

  private _startGlobalListening(isTouchEvent: boolean) {
    if (!this._onMouseMoveListener) {
      const eventName = isTouchEvent ? 'touchmove' : 'mousemove';
      this._onMouseMoveListener = this._renderer.listen('document', eventName, this.onMouseMoveHandler.bind(this));
    }

    if (!this._onMouseUpListener) {
      const eventName = isTouchEvent ? 'touchend' : 'mouseup';
      this._onMouseUpListener = this._renderer.listen('document', eventName, this.onMouseUpHandler.bind(this));
    }
  }

  private _stopGlobalListening() {
    if (this._onMouseMoveListener) {
      this._onMouseMoveListener = null;
    }

    if (this._onMouseUpListener) {
      this._onMouseUpListener = null;
    }
  }
}
