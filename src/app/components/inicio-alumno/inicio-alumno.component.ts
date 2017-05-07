import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-alumno',
  templateUrl: './inicio-alumno.component.html',
  styleUrls: ['./inicio-alumno.component.css']
})
export class InicioAlumnoComponent implements OnInit {
	materias:Array<object>;

	constructor() {
		this.materias=[
			{
				nombreMateria: "Bases de datos",
				progreso: "45%",
				calificacion: "40%",
				nuevos: "4"
			},
			{
				nombreMateria: "Administracion de redes",
				progreso: "50%",
				calificacion: "70%",
				nuevos: "12"
			},
			{
				nombreMateria: "Dispositivos Moviles",
				progreso: "90%",
				calificacion: "90%",
				nuevos: "5"
			}];
	}

	ngOnInit() {
	}

}
