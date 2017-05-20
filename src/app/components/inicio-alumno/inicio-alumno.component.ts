import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-inicio-alumno',
  templateUrl: './inicio-alumno.component.html',
  styleUrls: ['./inicio-alumno.component.css']
})
export class InicioAlumnoComponent implements OnInit {
	materias:Array<object>;
	articulos:Array<object>;
	proyectos:Array<object>;


	constructor() {

		this.materias=[
			{
				nombreMateria: "Bases de datos",
				progreso: "90%",
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
				nuevos: "3"	
			}];

		this.articulos=[
			{
				nombreArticulo: "¡Quieres apreder a programar?",
				estrellas: "4",
				comentarios: "2"
			},
			{
				nombreArticulo: "NinjaMock: una herramienta util",
				estrellas: "78",
				comentarios: "32"
			},
			{
				nombreArticulo: "Box model",
				estrellas: "13",
				comentarios: "21"
			}];

		this.proyectos=[
			{
				nombreProyecto: "Chat con firebase",
				estrellas: "89",
				comentarios: "12"
			},
			{
				nombreProyecto: "Administracion Restaurante",
				estrellas: "9",
				comentarios: "5"
			},
			{
				nombreProyecto: "Red social",
				estrellas: "19",
				comentarios: "21"
			}];

			
	}

	ngOnInit() {
		$('.collapsible').collapsible();
		$(".button-collapse-sideNav").sideNav({
	      menuWidth: 250,
	      closeOnClick: true,
	      hover:true
	    });
	}

}
