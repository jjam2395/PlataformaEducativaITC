import { Component, OnInit } from '@angular/core';
import { CursosService } from "../../services/cursos.service";

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  constructor(private _cs:CursosService ) {}

  ngOnInit() {
    //obtener carrera del estudiante
    //carcar los cursos de acuerdo a su carrera
    this._cs.cargarCursos("SC");
  }
}
