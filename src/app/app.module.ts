import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { EventRegisterService } from './services/event-register.service';
import { WatchScrollDirective } from './directives/watchscroll.directive';
import { WatchScrollRegisterDirective } from './directives/watchscroll-register.directive';
 
@NgModule({
  declarations: [
    AppComponent,
    WatchScrollDirective,
    WatchScrollRegisterDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [EventRegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
