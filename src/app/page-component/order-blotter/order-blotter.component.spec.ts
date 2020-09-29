import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {OrderBlotterComponent} from './order-blotter.component';

describe('OrderBlotterComponent', () => {
  let component: OrderBlotterComponent;
  let fixture: ComponentFixture<OrderBlotterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderBlotterComponent],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBlotterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
