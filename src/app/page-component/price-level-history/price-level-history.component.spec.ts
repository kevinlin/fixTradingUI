import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PriceLevelHistoryComponent} from './price-level-history.component';

describe('PriceLevelHistoryComponent', () => {
  let component: PriceLevelHistoryComponent;
  let fixture: ComponentFixture<PriceLevelHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PriceLevelHistoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceLevelHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
