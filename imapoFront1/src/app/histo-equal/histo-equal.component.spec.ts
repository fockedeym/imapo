import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoEqualComponent } from './histo-equal.component';

describe('HistoEqualComponent', () => {
  let component: HistoEqualComponent;
  let fixture: ComponentFixture<HistoEqualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoEqualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoEqualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
