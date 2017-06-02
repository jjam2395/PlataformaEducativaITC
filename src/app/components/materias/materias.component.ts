import { Component, OnInit } from '@angular/core';
import { CursosService } from "../../services/cursos.service";
import { UsuarioAlumnoService } from "../../services/usuarioAlumno.service";

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  carrera=null;
  constructor(private _cs:CursosService, 
  private _ua: UsuarioAlumnoService ) {

  }

  ngOnInit() {
    //obtener carrera del estudiante  
    let carrera=this._ua.getDatoUser("carrera").subscribe((val)=>{
      
      console.log("carrera desde componente",(val));
    }) ;
    // let intervId = setInterval(console.log(carrera) , 500);
    //console.log("desde materia componente",carrera);  
    //carcar los cursos de acuerdo a su carrera
    // this._cs.cargarCursos(carrera);
  }

  cargarCurso(carrera){
    if(carrera!=null){
      console.log("esta es la carrera",carrera);
    }else{
      console.log("no hay nada");
    }
    
  }
}
