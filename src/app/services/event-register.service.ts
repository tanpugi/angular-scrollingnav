import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject'; 

@Injectable()
export class EventRegisterService {
  
  private eventMap: Subject<any>[] = [];

  public getEvent(eventId: string): Subject<any> {
    if (!this.eventMap[eventId]) {
      this.eventMap[eventId] = new Subject<any>();
    }
    return this.eventMap[eventId];
  }
}