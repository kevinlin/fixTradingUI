import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TradingStateComponent} from './trading-state.component';

describe('TradingStateComponent', () => {
  let component: TradingStateComponent;
  let fixture: ComponentFixture<TradingStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TradingStateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
