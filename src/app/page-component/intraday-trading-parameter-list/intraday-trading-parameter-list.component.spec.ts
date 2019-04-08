import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {IntradayTradingParameterListComponent} from './intraday-trading-parameter-list.component';

describe('IntradayTradingParameterListComponent', () => {
  let component: IntradayTradingParameterListComponent;
  let fixture: ComponentFixture<IntradayTradingParameterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntradayTradingParameterListComponent],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntradayTradingParameterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
