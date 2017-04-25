import {
  Directive, ElementRef, Input, HostListener,
  OnInit, OnDestroy, Inject, Renderer2
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export abstract class _Directive
  implements OnInit, OnDestroy {

  protected readonly WINDOW_SCROLL_EVENTID: string = "watchscrolldirective_windowscrollevent";
  protected eventSubscriptions: Subscription[] = [];

  private _renderer;

  constructor(renderer: Renderer2){
    this._renderer = renderer;
  }

  ngOnInit() {}
  ngOnDestroy() {
    for (let esub of this.eventSubscriptions) {
      esub.unsubscribe();
    }
  }

  protected addRemoveClass(htmlEl: HTMLElement, elClass: string, isRemove?: boolean) {
    if (elClass) {
      if (isRemove) {
        this._renderer.removeClass(htmlEl, elClass);
      } else {
        this._renderer.addClass(htmlEl, elClass);
      }
    }
  }

  protected getWindowRef(): any {
    return window;
  }

  protected isXOR(arg1: boolean, arg2: boolean) {
    return (arg1?1:0) ^ (arg2?1:0);
  }
}