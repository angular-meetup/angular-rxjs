import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StreamService } from '../stream.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-replay-subject',
  templateUrl: './replay-subject.component.html'
})
export class ReplaySubjectComponent implements OnInit, OnDestroy {

  inputValue: FormControl;
  replaySubjectValue: number;
  replaySubjectWithTimeValue: number;

  subscription$ = new Subscription();
  newSubscriptions$ = new Subscription();

  constructor(private streamService: StreamService) {
    this.inputValue = new FormControl();
  }

  ngOnInit(): void {
    this.subscription$.add(
      this.streamService.replaySubject.subscribe(currentVal => {
          this.replaySubjectValue = currentVal;
        }
      )
    );

    this.subscription$.add(
      this.streamService.replaySubjectWithTime.subscribe(currentVal => {
          this.replaySubjectWithTimeValue = currentVal;
        }
      )
    );
  }

  sendInputValueToSubject(): void {
    this.streamService.replaySubjectWithTime.next(this.inputValue.value);
    this.streamService.replaySubject.next(this.inputValue.value);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  newSubscribe(replay: string) {
    if (replay === 'replay') {
      this.newSubscriptions$.add(this.streamService.replaySubject.subscribe(currentValue => console.log(currentValue)));
    } else if (replay === 'replayWithTime') {
      this.newSubscriptions$.add(this.streamService.replaySubjectWithTime.subscribe(currentValue => console.log(currentValue)));
    }
  }

  clearNewSubs() {
    this.newSubscriptions$.unsubscribe();
  }
}
