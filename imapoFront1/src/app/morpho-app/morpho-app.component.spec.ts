import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorphoAppComponent } from './morpho-app.component';

describe('MorphoAppComponent', () => {
  let component: MorphoAppComponent;
  let fixture: ComponentFixture<MorphoAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorphoAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorphoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
