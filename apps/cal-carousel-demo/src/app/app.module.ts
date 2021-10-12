import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalCarouselModule } from '@cal-carousel';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CalCarouselModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
