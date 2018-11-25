import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {TradingStrategyListComponent} from './trading-strategy-list.component';

describe('TradingStrategyListComponent', () => {
  let component: TradingStrategyListComponent;
  let fixture: ComponentFixture<TradingStrategyListComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TradingStrategyListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TradingStrategyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
