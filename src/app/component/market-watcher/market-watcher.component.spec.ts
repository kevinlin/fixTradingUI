import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketWatcherComponent } from './market-watcher.component';

describe('MarketWatcherComponent', () => {
  let component: MarketWatcherComponent;
  let fixture: ComponentFixture<MarketWatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarketWatcherComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
