import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//RUTAS
import { APP_ROUTING } from './app.routes';

//SERVICIOS

//COMPONENTES
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { InicioAlumnoComponent } from './components/inicio-alumno/inicio-alumno.component';
import { LoginComponent } from './components/shared/login/login.component';
import { SideNavComponent } from './components/shared/side-nav/side-nav.component';
import { NavbarHomeComponent } from './components/shared/navbar-home/navbar-home.component';
import { HomeComponent } from './components/home/home.component';
import { DudasComponent } from './components/shared/dudas/dudas.component';
import { ConocenosComponent } from './components/conocenos/conocenos.component';
import { OfertaEducativaComponent } from './components/oferta-educativa/oferta-educativa.component';
import { MateriaComponent } from './components/materia/materia.component';
import { ModuloComponent } from './components/shared/modulo/modulo.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioAlumnoComponent,
    LoginComponent,
    SideNavComponent,
    NavbarHomeComponent,
    HomeComponent,
    DudasComponent,
    ConocenosComponent,
    OfertaEducativaComponent,
    MateriaComponent,
    ModuloComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
