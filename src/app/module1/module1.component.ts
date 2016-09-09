/**
 * Created by jooskim on 8/5/16.
 */
import { Component, OnInit, Input } from '@angular/core';

require('app/module1/module1.scss');

@Component({
    selector: 'my-module1',
    template: `
    <article>
        <ng-content></ng-content>
    </article>
    `
})

export class MyModule1Component implements OnInit {
    @Input() private myName: string;

    ngOnInit(): any {
        console.log('Module 1 init', this.myName);
    }
}
