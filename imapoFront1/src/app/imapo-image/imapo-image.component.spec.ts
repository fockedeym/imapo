import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImapoImageComponent } from './imapo-image.component';

describe('ImapoImageComponent', () => {
  let component: ImapoImageComponent;
  let fixture: ComponentFixture<ImapoImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImapoImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImapoImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
