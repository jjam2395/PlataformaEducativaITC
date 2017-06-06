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
  showModulos;
  moduloActual;
  file: File;
  newCursoKey; //KEY DEL CURSO QUE FUE CREADO
  carrera;
  tituloVideo;

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


    this.carrera=this.curso.carrera;

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

  
  //SE MANDA A LLAMAR CADA VEZ QUE SE CARGA ALGO EN EL FIE
  onChangeVideos(event) {
    // console.log(event);
    let file = event.target.files[0];

    //SE MANDA EL ARCHIVO, LA CARRERA Y LA LLAVE DEL CURSO PARA GUARDARLO
    this._cursosServices.subirArchivo(file, this.carrera, this.newCursoKey, this.tituloVideo);



    // var files = event.srcElement.files;
    // console.log(files);
  }
}
