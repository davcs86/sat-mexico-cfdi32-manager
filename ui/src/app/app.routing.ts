import { RouterModule, Routes } from '@angular/router';

import { InvoiceTableComponent } from './components/invoiceTable/invoiceTable.component';
// import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', component: InvoiceTableComponent },
  { path: 'invoices', component: InvoiceTableComponent },
  // { path: 'about', component: AboutComponent}
];

export const routing = RouterModule.forRoot(routes);
