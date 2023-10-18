import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription, Observable} from 'rxjs';
import { map, filter} from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObs: Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstObs = interval(1000).subscribe(count => {
    //   console.log(count);
    // })

    const coustomIntervalObs = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is over 3!'))
        }
        count++;
      }, 1000)
    });


    this.firstObs = coustomIntervalObs.pipe(filter(data => {
      return data > 0
    }) ,map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message)
    }, () => {
      console.log('completed')
    })
  }

  ngOnDestroy() {
    this.firstObs.unsubscribe();
  }

}
