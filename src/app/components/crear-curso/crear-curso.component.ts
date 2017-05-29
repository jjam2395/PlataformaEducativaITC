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
  data;
  constructor(private _cursosServices: CursosService) {
    this.curso={
      nombre:"",
      objetivo:"",
      descripcion:"",
      instructores:[],
      modulos:[],
    }
   }

  ngOnInit() {
    $('.chips').material_chip();


    $('.chips.instructores').on('chip.add', function(e, chip){
      this.instructor=JSON.stringify(chip.tag);
    });


}


  guardar(){
    var data = $('.chips.instructores').material_chip('data');
    for(var i = 0;i<data.length;i++) {
      this.curso.instructores.push(data[i].tag);
    }

    var data = $('.chips.modulos').material_chip('data');
    for(var i = 0;i<data.length;i++) {
      this.curso.modulos.push(data[i].tag);
    }

    console.log(this.curso);
    this._cursosServices.nuevoCurso(this.curso)
      .subscribe(data=>{
      })
  }

}
