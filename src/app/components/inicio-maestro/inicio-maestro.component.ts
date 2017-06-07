import { Component, OnInit } from '@angular/core';
import { UserMaestroService } from "../../services/user-maestro.service";
import { CursosService } from "../../services/cursos.service";

@Component({
  selector: 'app-inicio-maestro',
  templateUrl: './inicio-maestro.component.html',
  styleUrls: ['./inicio-maestro.component.css']
})
export class InicioMaestroComponent implements OnInit {
	uidCursos:Array<string>; //KEY DE LOS CURSOS QUE HA CREADO
	articulos:Array<object>;
	proyectos:Array<object>;

	constructor(private _userMaestroService: UserMaestroService,
	) { 
	}

	ngOnInit() {
		this._userMaestroService.getCursos().subscribe(cursos=>{
			//RECORREMOS LOS CURSOS QUE HAYA CREADO Y GUARDAMOS SUS UIDS EN UN ARRAY
			for (let curso of cursos){
				this.uidCursos=curso.uidCurso;
			}

			//OBTENER El NOMBRE DE LOS CURSOS
			
		});
	}

}
