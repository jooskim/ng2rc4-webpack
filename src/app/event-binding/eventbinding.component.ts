/**
 * Created by jooskim on 8/5/16.
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MyCustomEvent } from './MyCustomEvent';

@Component({
    selector: 'my-event-binding',
    template: `
    <button (click)="onClick2($event)">Click me!</button>
    `
})

export class MyEventBindingComponent {
    @Input() myName: string;
    @Output() customBtnClick = new EventEmitter<MyCustomEvent>();

    onClick(evt: Event): any {
        console.log(`Name: ${this.myName}`);
        console.log(evt);
    }

    onClick2(evt: Event): any {
        let myEvt = new MyCustomEvent('customMyName', {myName: this.myName});
        this.customBtnClick.emit(myEvt);
    }
}
