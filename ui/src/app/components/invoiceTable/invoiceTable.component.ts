import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-home',
  templateUrl: './invoiceTable.component.html',
  styleUrls: ['./invoiceTable.component.scss']
})
export class InvoiceTableComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Home');
  }

}
