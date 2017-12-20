import { Component } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { InvoiceTableComponent } from './invoiceTable.component';

describe('Home Component', () => {
  const html = '<my-home></my-home>';

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [InvoiceTableComponent, TestComponent]});
    TestBed.overrideComponent(TestComponent, { set: { template: html }});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('Home Works!');
  });

});

@Component({selector: 'my-test', template: ''})
class TestComponent { }
