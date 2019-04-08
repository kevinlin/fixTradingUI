import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PriceLevelDerivativeHistoryComponent} from './price-level-derivative-history.component';

describe('PriceLevelDerivativeHistoryComponent', () => {
  let component: PriceLevelDerivativeHistoryComponent;
  let fixture: ComponentFixture<PriceLevelDerivativeHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PriceLevelDerivativeHistoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceLevelDerivativeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
