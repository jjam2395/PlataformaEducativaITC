import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { CursosService } from "../../services/cursos.service";
>>>>>>> e18e10c7f83ddd6330b4638bdc603dea133d7cd1

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }

  ngOnInit() {
    this.getCursos();
  }

  getCursos(){
    
  }

=======
  constructor(private _cs:CursosService ) {}

  ngOnInit() {
    //obtener carrera del estudiante
    //carcar los cursos de acuerdo a su carrera
    this._cs.cargarCursos("SC");
  }
>>>>>>> e18e10c7f83ddd6330b4638bdc603dea133d7cd1
}
