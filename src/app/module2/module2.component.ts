/**
 * Created by jooskim on 8/5/16.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-module2',
    template: `
        Enter image URL below<br/>
        <input type="text" (change)="onValueChange(imgUrl.value)" #imgUrl><br/><br/>
        
        <div [hidden]="!imgUrlConfirmed">
            Native DOM property binding
            <img
              [src]="imgUrlConfirmed"
              [ngStyle]="{ border: imgBorderStyle }"
            >
        </div>
        
`
})

export class MyModule2Component implements OnInit {
    private imgUrlConfirmed: string;
    private imgBorderStyle: string;

    ngOnInit(): any {
        console.log('Module 2 init');
    }

    onValueChange(imgUrl: string) {
        console.log(`Name is ${imgUrl}`);
        this.imgUrlConfirmed = imgUrl;
        if (imgUrl) {
            this.imgBorderStyle = '1px dashed lime';
        } else {
            this.imgBorderStyle = 'none';
        }

    }
}
