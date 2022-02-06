import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantizationTableComponent } from './quantization-table.component';

describe('QuantizationTableComponent', () => {
  let component: QuantizationTableComponent;
  let fixture: ComponentFixture<QuantizationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantizationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantizationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
