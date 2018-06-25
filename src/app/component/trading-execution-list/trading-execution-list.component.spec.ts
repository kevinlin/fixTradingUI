import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { TradingExecutionListComponent } from './trading-execution-list.component';

describe('TradingExecutionListComponent', () => {
  let component: TradingExecutionListComponent;
  let fixture: ComponentFixture<TradingExecutionListComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TradingExecutionListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TradingExecutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
