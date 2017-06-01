import { Component, OnInit } from '@angular/core';
import { CursosService } from "../../services/cursos.service";
import { UsuarioAlumnoService } from "../../services/usuarioAlumno.service";

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  constructor(private _cs:CursosService, 
  private _ua: UsuarioAlumnoService ) {

  }

  ngOnInit() {
    //obtener carrera del estudiante
    let carrera=this._ua.getDatoUser("carrera");
    console.log(carrera);
    //carcar los cursos de acuerdo a su carrera
    this._cs.cargarCursos(carrera);
  }
}
