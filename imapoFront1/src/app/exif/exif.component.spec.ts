import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExifComponent } from './exif.component';

describe('ExifComponent', () => {
  let component: ExifComponent;
  let fixture: ComponentFixture<ExifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
