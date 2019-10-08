import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StreamService } from '../stream.service';
import { AsyncSubject } from 'rxjs';

@Component({
  selector: 'app-async-subject',
  templateUrl: './async-subject.component.html'
})
export class AsyncSubjectComponent implements OnInit {

  inputValue: FormControl;

  constructor(private streamService: StreamService) {
    this.inputValue = new FormControl();
  }

  ngOnInit(): void {
  }

  sendInputValueToSubject(): void {
    this.streamService.asyncSubject.next(this.inputValue.value);
  }

  completeAsyncSubject(): void {
    this.streamService.asyncSubject.complete();
  }

  createNewAsyncSubject() {
    this.streamService.createNewAsyncSubject();
  }
}
