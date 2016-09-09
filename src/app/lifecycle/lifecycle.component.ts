/**
 * Created by jooskim on 8/20/16.
 */
import { Component, ElementRef, Directive, Renderer,
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy,
    Input,
    ViewChild,
         ContentChild,
         ContentChildren,
         QueryList
} from '@angular/core';

@Directive({
    selector: '[js-wants]'
})
export class JSWants {
    constructor(el: ElementRef, renderer: Renderer) {
        renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
    }
}

@Component({
    selector: 'my-lifecycle',
    directives: [JSWants],
    template: `<p #boundParagraph><ng-content></ng-content><br/>{{bindable}}</p>
        <p>{{boundParagraph.textContent}}</p>
        <button (click)="addMoreJSWants()">test me</button>
    `
})

export class LifecycleComponent implements OnInit,
OnChanges,
DoCheck,
AfterContentInit,
AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy {

    @Input() bindable = 1000;
    //@ViewChild('boundParagraph') boundParagraph: HTMLElement;
    @ContentChild('boundContent')
        boundContent: HTMLElement;

        @ContentChildren(JSWants) contentChildren: QueryList<JSWants>;

    constructor() {

    }

    addMoreJSWants() {
        this.log('hahaha')
    }

    ngOnInit() {
        this.log('ngOnInit');
    }

    ngOnChanges() {
        this.log('ngOnChanges');
    }

    ngDoCheck() {
        this.log('ngDoCheck');
    }

    ngAfterContentInit() {
        this.log('ngAfterContentInit');
    }

    ngAfterContentChecked() {
        this.log('ngAfterContentChecked');
    }

    ngAfterViewInit() {
        this.log('ngAfterViewInit');
        this.contentChildren.changes.subscribe((yo) => {
            console.log('changed!');
        })
    }

    ngAfterViewChecked() {
        this.log('ngAfterViewChecked');
        //console.log(this.boundContent);
    }

    ngOnDestroy() {
        this.log('ngOnDestroy');
    }

    private log(hook: string) {
        console.log(hook);
    }
}
