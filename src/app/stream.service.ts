import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  // will provide value when 'next()' is called
  subject: Subject<number> = new Subject<number>();

  // will provide the initial value, also stores current value
  behaviourSubject: BehaviorSubject<number> = new BehaviorSubject<number>(999);

  // like BehaviourSubject will also emit current value, but can record multiple values
  // i.e. record 2 values
  replaySubject: ReplaySubject<number> = new ReplaySubject<number>(2);
  // i.e. record 5 values, but remember for 5s only
  replaySubjectWithTime: ReplaySubject<number> = new ReplaySubject<number>(5, 5000);

  // will emit value on complete
  asyncSubject: AsyncSubject<number> = new AsyncSubject<number>();

  constructor() {
  }

  /**
   * actually you should not expose the subjects like this tutorial does !!!
   * better: make {@link StreamService} return readOnly Observables and handle value changes
   */
  readonly subjectObservable$ = this.subject.asObservable();

  subjectNextValue(nextValue: number): void {
    this.subject.next(nextValue);
  }

  createNewAsyncSubject() {
    this.asyncSubject = new AsyncSubject<number>();
  }
}
