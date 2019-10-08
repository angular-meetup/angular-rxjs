import { Component, OnInit } from '@angular/core';
import { StreamService } from '../stream.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html'
})
export class SubjectComponent implements OnInit {

  inputValue: FormControl;

  constructor(private streamService: StreamService) {
    this.inputValue = new FormControl();
  }

  ngOnInit(): void {
  }

  sendInputValueToSubject(): void {
    this.streamService.subject.next(this.inputValue.value);
  }
}
