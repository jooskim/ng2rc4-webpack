import {
    Component,
    Input,
    ElementRef,
    Renderer,
    OnInit,
    OnChanges,
    AfterViewInit,
    ContentChild,
    ContentChildren,
    QueryList,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ViewChildren
} from '@angular/core';
import { GrandChild, ServiceTwo } from './Another.component';

@Component({
    selector: 'my-child',
    directives: [GrandChild],
    providers: [ServiceTwo],
    template: `
        <div style="background-color: #efefef; padding: 10px;">
        <button (click)="stahpRefreshingData()">STAHP</button>
            <strong>Name</strong>:  {{ data.name }}<br/>
            <strong>Gender</strong>:  {{ data.gender }}<br/>
        <strong>Age</strong>:  {{ data.age }}<br/>
        <my-grandchild [mydata]="gcdata">
        <hr>
        <small>hellllo</small>
        </my-grandchild>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MyChildComponent implements OnInit, OnChanges, AfterViewInit {
    @ViewChildren(GrandChild) gchildren: QueryList<GrandChild>;
    @Input('mydata') data: {name: string, gender: string, age: number};
    private gcdata: any[];
    private intervalContext: any;

    constructor(private cdr: ChangeDetectorRef, private svcTwo: ServiceTwo) {

    }

    // get name(): string {
    //     console.log(this._name, 'accessed');
    //     return this._name;
    // }

    // set name(name: string) {
    //     this._name = name;
    // }

    ngAfterViewInit() {
    }

    stahpRefreshingData() {
        clearInterval(this.intervalContext);
    }

    ngOnChanges(inputChanges) {
        console.log('on changes', inputChanges);
    }

    ngOnInit() {
        this.svcTwo.data$.subscribe((arr) => {
            this.gcdata = arr;
            console.log('data received', this.gcdata);
            this.cdr.markForCheck();

        });

        this.intervalContext = this.svcTwo.simulateDataFetch();
    }

    sayHi() {
        console.log(`name: ${this.data.name}, gender: ${this.data.gender}, age: ${this.data.age}`);
    }

    refresh() {
        this.cdr.markForCheck();
    }

    setRandomAge(): number {
        this.data.age = Math.round(Math.random() * 100);
        this.cdr.markForCheck();
        console.log(`age changed to ${this.data.age}`);
        return this.data.age;
    }
}
