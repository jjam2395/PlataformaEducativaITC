import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaEducativaComponent } from './oferta-educativa.component';

describe('OfertaEducativaComponent', () => {
  let component: OfertaEducativaComponent;
  let fixture: ComponentFixture<OfertaEducativaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertaEducativaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaEducativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
