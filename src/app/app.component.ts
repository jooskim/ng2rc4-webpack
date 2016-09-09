/**
 * Created by jooskim on 8/4/16.
 */
'use strict';

import { Component } from '@angular/core';
import { MyModule1Component } from './module1/module1.component';
import { MyModule2Component } from './module2/module2.component';
import { MyEventBindingComponent } from './event-binding/eventbinding.component';
import { TwoWayBindingComponent } from './twoway-binding/twowaybinding.component';
import { LifecycleComponent, JSWants } from './lifecycle/lifecycle.component';
import { MyParentComponent } from './yo/Parent.component';

require('assets/app.scss');

@Component({
    selector: 'my-app',
    directives: [MyModule1Component, MyModule2Component, MyEventBindingComponent, TwoWayBindingComponent, LifecycleComponent, JSWants, MyParentComponent],
    templateUrl: 'assets/templates/myapp.html'
})

export class AppComponent {
    name: string;
    test = 'Test value';
    boundValue = 1000;

    constructor() {
        this.name = 'Josh';
    }

    onCustomBtnClick(val: string) {
        console.log('custom event received', val);
    }
}
