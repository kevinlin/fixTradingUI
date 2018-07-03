import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingStrategyViewComponent } from './trading-strategy-view.component';

describe('TradingStrategyViewComponent', () => {
  let component: TradingStrategyViewComponent;
  let fixture: ComponentFixture<TradingStrategyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TradingStrategyViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingStrategyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
