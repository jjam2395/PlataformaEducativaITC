import { Component, OnInit } from '@angular/core';
import { CursosService } from "../../services/cursos.service";
import { UsuarioAlumnoService } from "../../services/usuarioAlumno.service";

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  cursos
  constructor(private _cs:CursosService, 
  private _ua: UsuarioAlumnoService ) {

  }

  ngOnInit() {
    //obtener carrera del estudiante  
    //SE OBTIENE LA CARRERA ACTUAL DEL USUARIO
    this._ua.getDatoUser("carrera").subscribe((val)=>{
      if(val.$value){
        //SE MANDA A LLAMAR AL METODO DE CARGAR CURSOS
        this._cs.cargarCursos(val.$value).subscribe((res=>{
          this.cursos=res;
        }));
      }
    }) ;
  }
}
