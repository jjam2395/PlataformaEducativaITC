import { RouterModule, Routes} from '@angular/router';
import {InicioAlumnoComponent} from './components/inicio-alumno/inicio-alumno.component';
import {HomeComponent} from './components/home/home.component';
import {ConocenosComponent} from './components/conocenos/conocenos.component';
import {OfertaEducativaComponent} from './components/oferta-educativa/oferta-educativa.component';
import {MateriaComponent} from './components/materia/materia.component';
import {CrearCursoComponent} from './components/crear-curso/crear-curso.component';

const APP_ROUTES: Routes = [
	{path:'inicio-alumno',component: InicioAlumnoComponent},
	{path:'home',component: HomeComponent},
	{path:'conocenos',component: ConocenosComponent},
	{path:'oferta-educativa',component: OfertaEducativaComponent},
	{path:'materia',component: MateriaComponent},
	{path:'crear-curso', component: CrearCursoComponent},
	{path:'**', pathMatch: 'full', redirectTo:'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
