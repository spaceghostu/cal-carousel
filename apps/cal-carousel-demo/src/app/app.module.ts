import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalCarouselModule } from '@cal-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent,
    CardComponent,
    HeaderComponent
  ],
  imports: [BrowserModule, CalCarouselModule, BrowserAnimationsModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
