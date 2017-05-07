import { RouterModule, Routes} from '@angular/router';
import {InicioAlumnoComponent} from './components/inicio-alumno/inicio-alumno.component';
import {HomeComponent} from './components/home/home.component';
import {ConocenosComponent} from './components/conocenos/conocenos.component';

const APP_ROUTES: Routes = [
	{path:'inicio-alumno',component: InicioAlumnoComponent},
	{path:'home',component: HomeComponent},
	{path:'conocenos',component: ConocenosComponent},
	{path:'**', pathMatch: 'full', redirectTo:'inicio-alumno'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
