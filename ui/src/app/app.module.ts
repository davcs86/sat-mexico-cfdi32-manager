import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InvoiceTableComponent } from './components/invoiceTable/invoiceTable.component';

import { InvoiceService } from './providers/invoice/invoice.service';

import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        InvoiceTableComponent
    ],
    providers: [
        InvoiceService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {
    }

    // hmrOnInit(store) {
    //     console.log('HMR store', store);
    // }
    //
    // hmrOnDestroy(store) {
    //     let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    //     // recreate elements
    //     store.disposeOldHosts = createNewHosts(cmpLocation);
    //     // remove styles
    //     removeNgStyles();
    // }
    //
    // hmrAfterDestroy(store) {
    //     // display new elements
    //     store.disposeOldHosts();
    //     delete store.disposeOldHosts;
    // }
}
