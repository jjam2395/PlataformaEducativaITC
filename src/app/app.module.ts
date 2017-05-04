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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioAlumnoComponent
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
