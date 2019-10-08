import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StreamService } from '../stream.service';

@Component({
  selector: 'app-behaviour-subject',
  templateUrl: './behaviour-subject.component.html'
})
export class BehaviourSubjectComponent implements OnInit {

  inputValue: FormControl;

  constructor(private streamService: StreamService) {
    this.inputValue = new FormControl();
  }

  ngOnInit(): void {
  }

  sendInputValueToSubject(): void {
    this.streamService.behaviourSubject.next(this.inputValue.value);
  }
}
