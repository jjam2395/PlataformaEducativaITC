import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Curso } from '../../interfaces/curso.interface';
import { CursosService} from '../../services/cursos.service';

declare var $:any;
@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {

  curso;
  instructor:string;
  
  constructor(private _cursosServices: CursosService) {
    this.curso={
      nombre:"",
      objetivo:"",
      descripcion:"",
      instructores:[]
    }
   }

  ngOnInit() {
    $('.chips').material_chip();

    $('.chips.instructores').on('chip.add', function(e, chip){
      this.instructor=JSON.stringify(chip.tag);
      this.curso.instructores.push(this.instructor);

    });
  }

  guardar(){
    console.log(this.curso);
    this._cursosServices.nuevoCurso(this.curso)
      .subscribe(data=>{
        
      })
  }

}
