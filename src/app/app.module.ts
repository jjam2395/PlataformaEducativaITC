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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioAlumnoComponent,
    LoginComponent,
    SideNavComponent,
    NavbarHomeComponent,
    HomeComponent,
    DudasComponent
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
