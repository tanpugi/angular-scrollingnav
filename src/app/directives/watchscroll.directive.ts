import {
  Directive, ElementRef, Input, Renderer2
} from '@angular/core';
import { _Directive } from './_directive';
import { Subscription } from 'rxjs/Subscription';
import { EventRegisterService } from '../services/event-register.service';

interface WatchScrollOptions {
  item: string;
  start: number;
  stop: number;
}

@Directive({
  selector: '[watchScroll]'
})
export class WatchScrollDirective extends _Directive {

  @Input()
  private watchScroll: WatchScrollOptions | string;
  private previousState: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private eventRegister: EventRegisterService) {
    super(renderer);
  }

  ngOnInit() {
    this.renderer.listen("window", "scroll",
      (event: Event) => {
        if (typeof this.watchScroll === "string") {
          this.triggerMessage(this.watchScroll);
        }

        if (typeof this.watchScroll === "object") {
          this.triggerMessageControlled(this.watchScroll)
        }
      }
    );
  }

  private triggerMessage(watchScroll: string) {
    let htmlEl = (<HTMLElement>this.el.nativeElement);
    let item = watchScroll;
    let rect = htmlEl.getBoundingClientRect();
    let rectTop = rect.top - 1;

    let isOn = false;
    isOn = (rect.height + rectTop) < (rect.height) ? true : isOn;
    isOn = (rect.height + rectTop) == 0 ? true : isOn;
    isOn = rectTop < -(rect.height) ? false : isOn;

    if (this.isXOR(isOn, this.previousState)) {
      this.eventRegister.getEvent(this.WINDOW_SCROLL_EVENTID).next({item: item, state: isOn});
    }

    this.previousState = isOn;
  }

  private triggerMessageControlled(watchScroll: WatchScrollOptions) {
    let start = +watchScroll['start'];
    let stop = +watchScroll['stop'];
    let item = watchScroll['item'];
    let windowRef = this.getWindowRef();
    let pageYOffset = windowRef.pageYOffset;

    let isOn = false;
    isOn = pageYOffset > start;
    isOn = pageYOffset < stop ? false : isOn;

    if (this.isXOR(isOn, this.previousState)) {
      this.eventRegister.getEvent(this.WINDOW_SCROLL_EVENTID).next({item: item, state: isOn});
    }

    this.previousState = isOn;
  }
}