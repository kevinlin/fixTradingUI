import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionTableComponent } from './execution-table.component';

describe('ExecutionTableComponent', () => {
  let component: ExecutionTableComponent;
  let fixture: ComponentFixture<ExecutionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExecutionTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
