import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingStrategyDetailComponent } from './trading-strategy-detail.component';

describe('TradingStrategyDetailComponent', () => {
  let component: TradingStrategyDetailComponent;
  let fixture: ComponentFixture<TradingStrategyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TradingStrategyDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingStrategyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
