import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { EventsService } from './shared/events.service';
import { WatchScrollDirective, WatchScrollRegisterDirective } from './shared/watchscroll.directive';
 
@NgModule({
  declarations: [
    AppComponent,
    WatchScrollDirective,
    WatchScrollRegisterDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule
  ],
  providers: [EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
