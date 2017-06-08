  import { Component, OnInit, Directive } from '@angular/core';
import { UserMaestroService } from "../../services/user-maestro.service";
import { CursosService } from "../../services/cursos.service";
import { Router } from '@angular/router'

@Component({
  selector: 'app-inicio-maestro',
  templateUrl: './inicio-maestro.component.html',
  styleUrls: ['./inicio-maestro.component.css'],
})
export class InicioMaestroComponent implements OnInit {
	cursos=[]; //KEY DE LOS CURSOS QUE HA CREADO
	articulos:Array<object>;
	proyectos:Array<object>;
	modulos;

	// DATOS DEL CURSO SELECCIONADO PARA MOSTRAR Y SUBIR MATERIAL
	showActualizarCurso:boolean; //MOSTRAR SECCION DE CARGAR CURSO
	cursoDetalle; //DATOS DEL CURSO SELECCIONADO(uidCurso, carrera, nombre)
	modulosDetalle=[];

	constructor(private _userMaestroService: UserMaestroService,
	private _cursosService: CursosService,
	private router:Router) {
		this.showActualizarCurso=false;
	}

	ngOnInit() {
		//OBTENEMOS LOS CURSOS QUE HA CREADO DEL PERFIL DEL MAESTRO
		this._userMaestroService.getCursos().subscribe(cursos=>{
			//OBTENEMOS LOS NOMBRES DE LOS CURSOS QUE HA CREADO
			let cont = 1;
			console.log("longitud de cursos: ",cursos.length)
			for (let curso of cursos){
				 this._cursosService.gedDato(curso.carrera,curso.uidCurso,"nombre").subscribe(res=>{
					console.log("resultado de la consulta del nombre",res)
					this.cursos.push({
					uidCurso:curso.uidCurso,
					carrera:curso.carrera,
					nombre:res.$value
				 	})
					//VERIFICA QUE HAYA TERMIADO DE CONSULTAR EL NOMBRE DE TODOS LOS CURSOS
					if(cont==cursos.length){
						console.log("termino de obtener todos los cursos",this.cursos);
					}
					cont++;
				});
			}

		});

		// this._cursosService.getDato()
	}

	verCurso(curso){
		this.cursoDetalle=curso;
		this.showActualizarCurso=true;
		//OBTENER TODOS LOS DATOS DEL CURSO
		this._cursosService.cargarCursoObject(this.cursoDetalle.carrera, this.cursoDetalle.uidCurso).subscribe(res=>{
			console.log("curso cargado",res);
			let tempNameModulos=Object.getOwnPropertyNames(res.modulos.videos);
			for(let name of tempNameModulos){
				console.log("nombre de modulo",name);
				let keysVideos=Object(res.modulos.videos.name)
			}
		})


	}

}
