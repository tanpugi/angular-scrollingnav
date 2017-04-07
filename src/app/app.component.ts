import { Component, OnInit, ElementRef, AfterViewInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('testState', [
      state('inactive', style({
        backgroundColor: 'blue',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: 'red',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class AppComponent {

  public state: string ="inactive";

  constructor() { }

  changState() {
    if (this.state === "active") {
      this.state = "inactive";
    } else {
      this.state = "active";
    }
  }
  
}
