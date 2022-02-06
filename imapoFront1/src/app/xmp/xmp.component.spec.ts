import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XmpComponent } from './xmp.component';

describe('XmpComponent', () => {
  let component: XmpComponent;
  let fixture: ComponentFixture<XmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
