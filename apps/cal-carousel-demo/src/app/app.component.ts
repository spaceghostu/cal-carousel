import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cal-carousel-demo';
  carouselIndex = 0;
  onIndexChanged(index: number) {
    this.carouselIndex = index;
  }
}
