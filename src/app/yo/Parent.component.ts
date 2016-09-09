import {Component,
    OnInit,
    AfterViewInit,
    ViewChildren,
    ContentChild,
    QueryList,
    ChangeDetectionStrategy,
    Injectable
} from '@angular/core';
import {Control, FORM_DIRECTIVES} from '@angular/common';

import Immutable = require('immutable');
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs';
import {MyChildComponent} from './Child.component';
import 'rxjs/Rx';

@Injectable()
export class MyService {
    private peopleSource: Subject<any[]>;
    private _data: any[];

    constructor() {
        this.peopleSource = new Subject<any[]>();
    }

    get people$(): Observable<any[]> {
        return this.peopleSource.asObservable();
    }

    doSomething() {
        this._data[0] = {name: 'BCDE', age: 121, gender: 'MF'};
        this.peopleSource.next(this._data);
    }

    addOne() {
        this._data.push({
            name: 'DF',
            gender: 'M',
            age: 30
        });

        this.peopleSource.next(this._data);
    }

    loadAll() {
        this._data = [{
            name: 'A',
            gender: 'M',
            age: 15
        }, {
            name: 'B',
            gender: 'F',
            age: 7
        }, {
            name: 'C',
            gender: 'F',
            age: 9
        }];

        this.peopleSource.next(this._data);
    }
}

@Component({
    selector: 'my-parent',
    directives: [MyChildComponent],
    providers: [MyService],
    template: `
        <section>
            <input #newname type="text"><br>
            <input #newgender type="text"><br>
            <input #newage type="number" (keyup.enter)="addNewData(newname.value, newgender.value, newage.value)">
        </section>
        <section>
            <input type="text" [ngFormControl]="srchBox">
        </section>
        <my-child *ngFor="let child of people" [mydata]="child"></my-child>
        <button (click)="makeSayHi()">Say Hi</button>
        <button (click)="makeChange($event)">Do something</button>
        <button (click)="makeChangeTwo()">Do something 2</button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MyParentComponent implements AfterViewInit, OnInit {
    private initialArr: any;
    private srchBox: Control = new Control();
    private people: any[];

    @ContentChild('twowaytest') twt: HTMLInputElement;
    @ViewChildren(MyChildComponent) myc: QueryList<MyChildComponent>;

    constructor(private myservice: MyService) {
        
    }

    ngOnInit() {
        this.myservice.people$.subscribe(people => {
            console.log('people', people);
            this.people = people;

        });
        this.myservice.loadAll();
    }

    ngAfterViewInit() {
        console.log('hmm', this.myc);
        this.srchBox.valueChanges.debounceTime(200).subscribe((event) => { console.log(event); });
    }

    makeSayHi() {
        for(let i = 0; i < this.myc.length; i++) {
            this.myc.toArray()[i].sayHi();
        }


    }

    makeChange(event: Event) {
        // let newAge:number = this.myc.first.setRandomAge();
        this.myservice.doSomething();
    }

    makeChangeTwo() {
        // this.initialArr[0].age = Math.round(Math.random() * 100);
        this.myservice.addOne();

    }

    addNewData(name: string, gender: string, age: number) {
        this.initialArr.push({
            name: name,
            gender: gender,
            age: age
        });
    }
}
