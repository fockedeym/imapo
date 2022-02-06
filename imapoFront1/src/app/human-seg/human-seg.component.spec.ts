import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanSegComponent } from './human-seg.component';

describe('HumanSegComponent', () => {
  let component: HumanSegComponent;
  let fixture: ComponentFixture<HumanSegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumanSegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanSegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
