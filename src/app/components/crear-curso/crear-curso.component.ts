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

  nombre;
  objetivo;
  descripcion;
  instructores:Array<any>;


constructor(private _cursosServices: CursosService) {
   }

  ngOnInit() {
    $('.chips').material_chip();
    $('.chips.instructores').on('chip.add', function(e, chip){
      $.myFunction();
    });
  }

  guardar(){
    console.log(this.nombre, this.objetivo, this.descripcion, this.instructores );
    // this._cursosServices.nuevoCurso()
    //   .subscribe(data=>{
        
    //   })
  }
  $.myFunction = function() {
    alert('hi');
  }

  agregarElemento(){
    // this.instructores.push(elemento);
    console.log("hola");
  }

}
