/**
 * Created by jooskim on 8/20/16.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'my-twoway-binding',
    template: `
        <input type="text" [(ngModel)]="person.name">
        <input type="text" [(ngModel)]="person.name">
    `
})

export class TwoWayBindingComponent {
    person = {
        name: 'Max',
        age: 27
    };

    ngAfterContentInit(): any {
        console.log('content initialized');
    }

    ngAfterViewInit(): any {
        console.log('after view init');
    }
}
