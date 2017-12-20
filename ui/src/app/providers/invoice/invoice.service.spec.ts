import { inject, TestBed } from '@angular/core/testing';
import { InvoiceService } from './invoice.service';
import 'jasmine';

describe('Api Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({providers: [InvoiceService]});
    });

    it('should ...', inject([InvoiceService], (api) => {
        expect(api.title).toBe('Angular 2');
    }));
});
