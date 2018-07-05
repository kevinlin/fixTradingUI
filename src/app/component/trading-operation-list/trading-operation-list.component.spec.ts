import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { TradingOperationListComponent } from './trading-operation-list.component';

describe('TradingOperationListComponent', () => {
  let component: TradingOperationListComponent;
  let fixture: ComponentFixture<TradingOperationListComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TradingOperationListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TradingOperationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
