import { Component, OnInit } from '@angular/core';
import { StreamService } from '../stream.service';
import { combineLatest, from, Observable, of } from 'rxjs';
import { delay, filter, map, repeat, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-operators',
  templateUrl: './rxjs-operators.component.html'
})
export class RxjsOperatorsComponent implements OnInit {

  constructor(private streamService: StreamService) {
  }

  ngOnInit() {
  }

  manySubscribesMethod() {
    // don't nest subscribes ...
    this.streamService.subject.subscribe(firstValue => {
      this.transformNumberToObservable(firstValue).subscribe(secondValue => {
        this.transformNumberToObservable(secondValue).subscribe(thirdValue => {
          this.transformNumberToObservable(thirdValue).subscribe(finalValue => {
            console.log(finalValue);
          });
        });
      });
    });

    // ... use this instead
    this.streamService.subject.pipe(
      switchMap(firstValue => this.transformNumberToObservable(firstValue)),
      switchMap(secondValue => this.transformNumberToObservable(secondValue)),
      switchMap(thirdValue => this.transformNumberToObservable(thirdValue)),
      map(finalValue => console.log(finalValue))
    );
  }

  pipeAndOperators() {
    // potentially reusable functions
    const squareValues = map((val: number) => val * val);
    const someFilter = filter((val: number) => val <= 3);

    this.transformArrayToObservable([1, 2, 3, 4, 5]).pipe(
      squareValues,
      someFilter,
      delay(100),
      repeat(5),
      tap(val => console.log(val)),
      map(val => val * 2),
      tap(newVal => console.log(newVal)),
      filter(n => n > 5)
    ).subscribe(finalVal => console.log(finalVal));
  }

  combineObservables() {
    const behaviourObs$ = this.streamService.behaviourSubject.asObservable();
    const replayObs$ = this.streamService.replaySubject.asObservable();
    const asyncObs$ = this.streamService.asyncSubject.asObservable();

    combineLatest(
      behaviourObs$,
      replayObs$,
      asyncObs$).subscribe(([behaviourValue, replayValue, asyncValue]) => {
        console.log(behaviourValue);
        console.log(replayValue);
        console.log(asyncValue);
      }
    );
  }

  transformNumberToObservable(value: number): Observable<number> {
    return of(value);
  }

  transformArrayToObservable(values: number[] | string[] | any[]): Observable<number | string | any> {
    return from(values);
  }
}
