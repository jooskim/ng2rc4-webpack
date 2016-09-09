import {
    Component,
    Input,
    OnInit,
    OnChanges,
    AfterViewInit,
    Injectable,
    QueryList,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';

import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServiceTwo {
    private _data: Array<any>;
    private _subject: Subject<Array<any>> = new Subject<Array<any>>();

    get data$(): Observable<Array<any>> {
        return this._subject.asObservable();
    }

    constructor() {
        this._data = [];
    }

    setInitData() {
        this._data = [10, 30, 50, 70, 90];
        this._subject.next(this._data);
    }

    simulateDataFetch() {
        return setInterval(() => {
            let newArr: any[] = [];
            for (let i = 0; i < 1 + Math.round(Math.random()) * 4; i++) {
                newArr[i] = Math.round(Math.random() * 100);
            }
            this._data = newArr;
            this._subject.next(this._data);

        }, Math.round(Math.random() * 5000))
    }

    instantDataChange() {
        this._data = [22, 56, 78];
        this._subject.next(this._data);
    }
}

@Component({
    selector: 'my-grandchild',
    template: `
        <section>
        <strong>GRANDCHILD</strong>
        <ul>
        <li *ngFor="let row of mydata" style="background-color: #ac93bf; padding: 15px; display: inline-block">{{ row }}
        </li>
        </ul>
        </section>
        <ng-content></ng-content>
        `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GrandChild implements OnInit, AfterViewInit, OnChanges {
    @Input() mydata: number;

    constructor(private cdr: ChangeDetectorRef) {
        console.log('grand child activated');
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    ngOnChanges(inputChanges) {
        console.log('grand child change', inputChanges);
    }
}
