import { Component } from '@angular/core';

// import { ApiService } from './shared';

@Component({
    selector: 'my-app', // <my-app></my-app>
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    url = 'https://github.com/preboot/angular2-webpack';
    title: string;

    constructor() {
        this.title = '5555';
    }
}
