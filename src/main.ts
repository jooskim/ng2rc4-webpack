/**
 * Created by jooskim on 8/4/16.
 */
import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from 'app/environment';
import { AppComponent } from 'app/app.component';

if (environment.production) {
    enableProdMode();
}

bootstrap(AppComponent);
