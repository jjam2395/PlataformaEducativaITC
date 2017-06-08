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
	}

	ngOnInit() {
		// $('.collapsible').collapsible();
		$(".button-collapse-sideNav").sideNav({
	      menuWidth: 250,
	      closeOnClick: true,
	      hover:true
	    });
	}

}
