import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingOperationDetailComponent } from './trading-operation-detail.component';

describe('TradingOperationDetailComponent', () => {
  let component: TradingOperationDetailComponent;
  let fixture: ComponentFixture<TradingOperationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TradingOperationDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingOperationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
