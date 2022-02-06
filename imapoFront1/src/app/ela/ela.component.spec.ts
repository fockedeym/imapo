import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElaComponent } from './ela.component';

describe('ElaComponent', () => {
  let component: ElaComponent;
  let fixture: ComponentFixture<ElaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
