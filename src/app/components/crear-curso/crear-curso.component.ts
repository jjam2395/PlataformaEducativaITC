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

  curso:Curso={
    nombre:"",
    objetivo:"",
    descripcion:"",
    instructores:[]
  }
  constructor(private _cursosServices: CursosService) { }
  hola:any;
  ngOnInit() {
    $('.chips').material_chip();

    $('.chips').on('chip.add', function(e, chip){
      console.log("chip",chip);
      this.hola=JSON.stringify(chip.tag);
    // you have the added chip here
      console.log(this.hola);
    });
  }

  guardar(){
    console.log(this.curso);
    this._cursosServices.nuevoCurso(this.curso)
      .subscribe(data=>{
        
      })
  }

}
