import { RouterModule, Routes} from '@angular/router';
import {InicioAlumnoComponent} from './components/inicio-alumno/inicio-alumno.component';
import {HomeComponent} from './components/home/home.component';
import {ConocenosComponent} from './components/conocenos/conocenos.component';
import {OfertaEducativaComponent} from './components/oferta-educativa/oferta-educativa.component';
import {MateriasComponent} from './components/materias/materias.component';
import {ArticuloComponent} from './components/articulo/articulo.component';
import {CrearCursoComponent} from './components/crear-curso/crear-curso.component';
import { RegistroComponent } from "./components/registro/registro.component";
import { MateriaDetalleComponent } from "./components/materia-detalle/materia-detalle.component";
import { InicioMaestroComponent } from "./components/inicio-maestro/inicio-maestro.component";
import { DudasResponderComponent} from './components/dudas-responder/dudas-responder.component';

import { AuthGuardService } from "./services/auth-guard.service";

const APP_ROUTES: Routes = [
	{path:'inicio-alumno',component: InicioAlumnoComponent, canActivate: [AuthGuardService] },
	{path:'home',component: HomeComponent},
	{path:'conocenos',component: ConocenosComponent},
	{path:'oferta-educativa',component: OfertaEducativaComponent},
	{path:'materias',component: MateriasComponent, canActivate: [AuthGuardService]},
	{path:'articulo',component: ArticuloComponent},
	{path:'crear-curso', component: CrearCursoComponent},
	{path:'registro', component: RegistroComponent},
	{path:'detalle/:id', component: MateriaDetalleComponent},
	{path:'inicio-maestro', component: InicioMaestroComponent},
	{path:'responderdudas', component: DudasResponderComponent},
	{path:'**', pathMatch: 'full', redirectTo:'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
