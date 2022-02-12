import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholderComponent } from './thresholder.component';

describe('ThresholderComponent', () => {
  let component: ThresholderComponent;
  let fixture: ComponentFixture<ThresholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThresholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThresholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
