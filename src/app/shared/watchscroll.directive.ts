import { Directive, ElementRef, Input, Renderer2, HostBinding, HostListener } from '@angular/core';

import { EventsService } from './events.service';

@Directive({ 
  selector: '[watchScroll]'
})
export class WatchScrollDirective {
    
    @Input()
    private watchScroll: string;
    private previousState: boolean = false;

    constructor(private el: ElementRef, private eventsService: EventsService) { }

    @HostListener("window:scroll", [])
    onWindowScroll() {
      let htmlEl = (<HTMLElement>this.el.nativeElement);
      let rect = htmlEl.getBoundingClientRect();
      let rectTop = rect.top - 10;

      let isActive = false;
      isActive = (rect.height + rectTop) < (rect.height) ? true : isActive;
      isActive = (rect.height + rectTop) == 0 ? true : isActive;
      isActive = rectTop < -(rect.height) ? false : isActive;

      if (isActive && !this.previousState) {
        this.eventsService.getWindowScrollEvent().next(this.watchScroll);
      }

      this.previousState = isActive;
    }

    private getStyle(htmlEl: HTMLElement, prop: string, remove?: string): any {
      let style = '';
      let inlineStyle = htmlEl.style.getPropertyValue(prop);
      if (inlineStyle) {
        style = inlineStyle;
      } else {
        style = window.getComputedStyle(htmlEl).getPropertyValue(prop);
      }

      return style.replace(remove,'');
    }
}

@Directive({ 
  selector: '[watchScrollRegister]'
})
export class WatchScrollRegisterDirective {
    
    @Input() watchScrollRegister: {id: string, class?: string, style?: {}[]};

    constructor(private el: ElementRef, private eventsService: EventsService) {
      let htmlEl = (<HTMLElement>el.nativeElement);
      this.eventsService.getWindowScrollEvent().subscribe(
        (msg: string) => {
          let isSet = msg !== this.watchScrollRegister.id;
          this.setClass(htmlEl, this.watchScrollRegister.class, isSet);
        }
      );
    }

    private setClass(htmlEl: HTMLElement, elClass: string, isRemove?: boolean) {
      if (elClass) {
        let currentClass = htmlEl.getAttribute('class');
        if (isRemove && currentClass) {
          currentClass = currentClass.replace(elClass, '');
        }

        if (!isRemove && currentClass) {
          currentClass = currentClass + ' ' + elClass;
        } 

        if (!isRemove) {
          currentClass = elClass;
        }

        htmlEl.setAttribute('class', currentClass);
      }
    }

    private getStyle(htmlEl: HTMLElement, prop: string, remove?: string): any {
      let style = '';
      let inlineStyle = htmlEl.style.getPropertyValue(prop);
      if (inlineStyle) {
        style = inlineStyle;
      } else {
        style = window.getComputedStyle(htmlEl).getPropertyValue(prop);
      }

      return style.replace(remove,'');
    }
}