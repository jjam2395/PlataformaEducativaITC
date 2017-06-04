import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConf } from '../environments/firebase.conf';


//RUTAS
import { APP_ROUTING } from './app.routes';

//SERVICIOS
import { LoginService } from './services/login.service';
import { CursosService } from './services/cursos.service';
import { AuthGuardService } from "./services/auth-guard.service";
import { UsuarioAlumnoService } from "./services/usuarioAlumno.service";
import { DudasService} from './services/dudas.service';

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
import { MateriasComponent } from './components/materias/materias.component';
import { ModuloComponent } from './components/shared/modulo/modulo.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { CrearCursoComponent } from './components/crear-curso/crear-curso.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MateriaDetalleComponent } from './components/materia-detalle/materia-detalle.component';

import { NameCarreraPipe } from './customPipes/name-carrera.pipe';
import { AdminComponent } from './components/admin/admin.component';
import { DudasResponderComponent } from './components/dudas-responder/dudas-responder.component';


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
    MateriasComponent,
    ModuloComponent,
    ArticuloComponent,
    CrearCursoComponent,
    RegistroComponent,
    MateriaDetalleComponent,
    NameCarreraPipe,
    AdminComponent,
    DudasResponderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(firebaseConf),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterializeModule
  ],
  providers: [ //AQUI SE DECLARAN LOS SERVICIOS
              LoginService,
              CursosService,
              AuthGuardService,
              UsuarioAlumnoService,
              DudasService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
