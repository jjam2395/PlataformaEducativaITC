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
  displayMateriaDetalle:boolean; //Para saber cuando el usuario presiona en ver un curso
  cursoToDisplay:object;

  displayDescripcion:boolean;
  displayObjetivo:boolean;
  displayModulos:boolean;
  displayInstructor:boolean;
  displayCalificaciones:boolean;

  constructor(private _cs:CursosService, 
  private _ua: UsuarioAlumnoService ) {
    this.displayMateriaDetalle=false;

    this.displayDescripcion=true;
    this.displayObjetivo=false;
    this.displayModulos=false;
    this.displayInstructor=false;
    this.displayCalificaciones=false;
  }

  ngOnInit() {
    //obtener carrera del estudiante  
    //SE OBTIENE LA CARRERA ACTUAL DEL USUARIO
    this._ua.getDatoUser("carrera").subscribe((val)=>{
      if(val.$value){
        //SE MANDA A LLAMAR AL METODO DE CARGAR CURSOS
        this._cs.cargarCursos(val.$value).subscribe((res=>{
          
          this.cursos=res;
          console.log(res);
          // console.log("resuldato de los cursos",res); 
        }));
      }
    }) ;
  }

  verMateria(curso){
    this.displayMateriaDetalle=true;
    this.cursoToDisplay=curso;
  }

  regresar(){
    this.displayMateriaDetalle=false;
  }

  showDescripcion(){
   this.displayDescripcion=true;
   this.displayObjetivo=false;
   this.displayModulos=false;
   this.displayInstructor=false;
   this.displayCalificaciones=false;
  }

  showObjetivo(){
   this.displayDescripcion=false;
   this.displayObjetivo=true;
   this.displayModulos=false;
   this.displayInstructor=false;
   this.displayCalificaciones=false;
  }

  showModulos(){
   this.displayDescripcion=false;
   this.displayObjetivo=false;
   this.displayModulos=true;
   this.displayInstructor=false;
   this.displayCalificaciones=false;
  }

  showInstructor(){
   this.displayDescripcion=false;
   this.displayObjetivo=false;
   this.displayModulos=false;
   this.displayInstructor=true;
   this.displayCalificaciones=false;
  }

  showCalificaciones(){
   this.displayDescripcion=false;
   this.displayObjetivo=false;
   this.displayModulos=false;
   this.displayInstructor=false;
   this.displayCalificaciones=true;
  }

}
