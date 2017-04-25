import {
  Directive, ElementRef, Input, Renderer2
} from '@angular/core';
import { _Directive } from './_directive';
import { EventRegisterService } from '../services/event-register.service';

interface WatchScrollRegisterOptions {
  item: string;
  class?: string;
}

@Directive({
  selector: '[watchScrollRegister]'
})
export class WatchScrollRegisterDirective extends _Directive {

  @Input()
  private watchScrollRegister: WatchScrollRegisterOptions | string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private eventRegister: EventRegisterService) {
    super(renderer);
  }

  ngOnInit() {
    let htmlEl = (<HTMLElement>this.el.nativeElement);
    let esub =
      this.eventRegister.getEvent(this.WINDOW_SCROLL_EVENTID)
        .subscribe(
        (msg: {item: string, state: boolean}) => {
          let registered = undefined;
          let item = undefined;
          let type = undefined;
          let elClass = "active";
          let isAddClass = false;

          if (typeof this.watchScrollRegister === "string") {
            registered = this.watchScrollRegister.split(":");
          }

          if (typeof this.watchScrollRegister === "object") {
            registered = this.watchScrollRegister['item'].split(":");
            elClass = this.watchScrollRegister['class'];
          }

          item = registered[0];
          type = registered[1];

          if (item === msg.item) {
            isAddClass = msg.state;

            switch (type) {
              case ("hidden"): break;
              default: this.addRemoveClass(htmlEl, elClass, !isAddClass);
            }
          }
        }
      );

    this.eventSubscriptions.push(esub);
  }
}