import { RouterModule, Routes} from '@angular/router';
import {InicioAlumnoComponent} from './components/inicio-alumno/inicio-alumno.component';

const APP_ROUTES: Routes = [
	{path:'inicio-alumno',component: InicioAlumnoComponent},
	{path:'**', pathMatch: 'full', redirectTo:''}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES); 