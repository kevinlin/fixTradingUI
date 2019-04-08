import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IntradayTradingParameterDetailComponent} from './intraday-trading-parameter-detail.component';

describe('IntradayTradingParameterDetailComponent', () => {
  let component: IntradayTradingParameterDetailComponent;
  let fixture: ComponentFixture<IntradayTradingParameterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntradayTradingParameterDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntradayTradingParameterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
