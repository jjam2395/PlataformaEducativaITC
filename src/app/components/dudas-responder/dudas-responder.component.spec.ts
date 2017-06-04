import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DudasResponderComponent } from './dudas-responder.component';

describe('DudasResponderComponent', () => {
  let component: DudasResponderComponent;
  let fixture: ComponentFixture<DudasResponderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DudasResponderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DudasResponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
