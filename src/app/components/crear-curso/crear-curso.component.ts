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
  curso; //objeto con los datos generales del curso
  showModulos:boolean;
  moduloActual; //NOMBRE DEL MODULO ACTUAL
  file: File; //VIDEO SELECCIONADO POR EL USUARIO
  newCursoKey; //KEY DEL CURSO QUE FUE CREADO
  cursoActual:{}; //OBJETO CON LOS DATOS GENERALES DEL CURSO ACTUAL
  tituloVideo; //TITULO DEL VIDEO 

  constructor(private _cursosServices: CursosService) {
    this.newCursoKey=null;
    this.showModulos=false;
    this.curso={
      nombre:"",
      objetivo:"",
      descripcion:"",
      carrera:"",
      modulos:[],
    }
   }

  ngOnInit() {
    $('.chips').material_chip();
  }

  guardar(){

    //SE RECOGEN LOS NOMBRES DE LOS MODULOS Y SE METEN EN EL ARREGLO CONTENIDO EN EL OBJETO CURSO
    var data = $('.chips.modulos').material_chip('data');
    for(var i = 0;i<data.length;i++) {
      let nombreModulo=data[i].tag
      this.curso.modulos.push(nombreModulo);
    }

    //SE GUARDAN LOS DATOS GENERALES DEL CURSO, (AL TERMINAR LA FUNCINO THIS.CURSO SE RESETEA)
    this.cursoActual=JSON.parse(JSON.stringify(this.curso));

    //CREACION DEL CURSO SIN MODULOS, PARA OBTENER UN UID
    this.newCursoKey= this._cursosServices.nuevoCurso(this.curso);
    console.log("llave del curso creado",this.newCursoKey);

    //SETEAR EL MODULO DE INICIO Y MOSTRAR SU VISTA
    this.moduloActual=this.curso.modulos[0];
    this.showModulos=true;
  }

  //SELECCION DEL MODULO A MOSTRAR DESDE EL BOTON DROPDOWN EN LA VISTA DE SUBIR ARCHIVOS
  seleccionarModulo(modulo){
    this.moduloActual=modulo;
  }

  
  //SE MANDA A LLAMAR CADA VEZ QUE SE CARGA ALGO EN EL FILE
  onChangeVideos(event) {
    //SE GUARDA EL ARCHIVO QUE SELECCIONO EL USUARIO
    this.file = event.target.files[0];
  }

  subirArchivo(){
    // SE MANDA EL VIDEO SELECCIONADO POR EL USUARIO, DATOS GRL DEL CURSO, KEY DEL CURSO, TITULO DLE VIDEO
    this._cursosServices.subirArchivo(this.file, this.cursoActual,this.moduloActual, this.newCursoKey, this.tituloVideo);
  }
}
