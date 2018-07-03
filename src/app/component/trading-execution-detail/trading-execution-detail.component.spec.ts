import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingExecutionDetailComponent } from './trading-execution-detail.component';

describe('TradingExecutionDetailComponent', () => {
  let component: TradingExecutionDetailComponent;
  let fixture: ComponentFixture<TradingExecutionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TradingExecutionDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingExecutionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
