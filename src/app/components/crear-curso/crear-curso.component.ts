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
  instructores:string[]=[];


  constructor(private _cursosServices: CursosService) {
   }

  ngOnInit() {
    $('.chips').material_chip();

    $('.chips.instructores').on('chip.add', function(e, chip){
      this.instructor=JSON.stringify(chip.tag);
      this.instructores.push(this.instructor);
    });
  }

  guardar(){
    console.log(this.nombre, this.objetivo, this.descripcion, this.instructores );
    // this._cursosServices.nuevoCurso()
    //   .subscribe(data=>{
        
    //   })
  }

}
