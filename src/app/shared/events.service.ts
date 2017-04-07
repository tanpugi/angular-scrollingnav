import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventsService {

  private windowScrollEvent = new Subject();

  public getWindowScrollEvent() {
    return this.windowScrollEvent;
  }
}