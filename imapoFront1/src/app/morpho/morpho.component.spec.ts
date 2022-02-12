import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorphoComponent } from './morpho.component';

describe('MorphoComponent', () => {
  let component: MorphoComponent;
  let fixture: ComponentFixture<MorphoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorphoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorphoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
