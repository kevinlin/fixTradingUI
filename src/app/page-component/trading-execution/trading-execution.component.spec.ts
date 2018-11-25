import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {TradingExecutionComponent} from './trading-execution.component';

describe('TradingExecutionComponent', () => {
  let component: TradingExecutionComponent;
  let fixture: ComponentFixture<TradingExecutionComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TradingExecutionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TradingExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
