import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioMaestroComponent } from './inicio-maestro.component';

describe('InicioMaestroComponent', () => {
  let component: InicioMaestroComponent;
  let fixture: ComponentFixture<InicioMaestroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioMaestroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
