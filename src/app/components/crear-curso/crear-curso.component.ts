import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Curso } from '../../interfaces/curso.interface';
import { CursosService} from '../../services/cursos.service';
import { UserMaestroService } from "../../services/user-maestro.service";
import { ActivatedRoute, Params,Router } from '@angular/router';  
declare var $:any;

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {
  curso; //objeto con los datos generales del curso
  showModulos:boolean; //MOSTRAR SECCION PARA SUBIR MATERIAL A LOS MODULOS
  moduloActual; //NOMBRE DEL MODULO ACTUAL
  file: File; //VIDEO SELECCIONADO POR EL USUARIO
  newCursoKey; //KEY DEL CURSO QUE FUE CREADO
  cursoActual:{}; //OBJETO CON LOS DATOS GENERALES DEL CURSO ACTUAL
  tituloVideo; //TITULO DEL VIDEO 
  // -----------------------------------------
  // @Input() tempCurso=null;
  // videosSubidos;


  constructor(private _cursosServices: CursosService,
  private _userMaestroService: UserMaestroService,
  private route: ActivatedRoute) {
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

  // ngAfterViewInit(){
  //   console.log("parametros desde el padre",this.tempCurso)
  //   if(this.tempCurso){
  //     console.log("me pasaron parametros");
  //   }
  //   // if(this.tempCurso!=null){
  //   //   console.log("Me han pasado parametros desde un componente padre");
  //   //   // (uidCurso, nombre, carrera)
  //   //   this.showModulos=true;
  //   //   //REALIZAR UNA CONSULTA PARA OBTENER LOS MODULOS
  //   // }
  // }

  // ngOnChanges(){
  //   if(this.tempCurso!=null){
  //     this.cargarNombreModulos();
  //   }
  // }

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

    //SE GUARDA EL UID DEL CURSO EN EL PERFIL DEL MAESTRO
    this._userMaestroService.guardarCurso(this.newCursoKey, this.cursoActual);
    console.log("llave del curso creado",this.newCursoKey);

    //SETEAR EL MODULO DE INICIO Y MOSTRAR SU VISTA
    this.moduloActual=this.curso.modulos[0];
    this.showModulos=true;
  }

  //SELECCION DEL MODULO A MOSTRAR DESDE EL BOTON DROPDOWN EN LA VISTA DE SUBIR ARCHIVOS
  seleccionarModulo(modulo){
    //SE ESTABLECE EL NOMBRE DEL MODULO ACTUAL
    this.moduloActual=modulo;
    // this.videosSubidos=null;
    //SE CARGAN LOS VIDEOS DEL MODULO ACTUAL
    // this.cargarVideos();
    
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

  // cargarNombreModulos(){
  //   this.curso.modulos=[] 
  //   //MOSTRAMOS LA VISTA DE MODULOS
  //   this.showModulos=true;
  //   this._cursosServices.gedDato(this.tempCurso.carrera,this.tempCurso.uidCurso,"modulos").subscribe(res=>{
  //     if(res.videos!=null){
  //       console.log("no esta vacio")
  //       //ARRAY CON LOS NOMBRES DE LOS MODULOS
  //       this.curso.modulos =  Object.getOwnPropertyNames(res.videos)
  //       this.moduloActual=this.curso.modulos[0];   
  //       console.log("resultado de la consulta de los modulos",res.videos) 

  //       // CARGAR LOS VIDEOS DE CADA MODULO
  //       this.cargarVideos();
  //     }else{
  //       console.log( "resultado",res);
  //     }
  //     // 
  //   });
  // }

  //CARGA LOS VIDEOS SUBIDOS EN UN ARREGLO DE OBJETOS
  // cargarVideos(){
  //   console.log("este es el modulo actual",this.moduloActual);
  //   this._cursosServices.getVideos(this.tempCurso.carrera, this.tempCurso.uidCurso, this.moduloActual ).subscribe(res=>{
  //     console.log("resultado de la consulta de videos",res);
  //     this.videosSubidos=res;
  //     console.log("videos subidos", this.videosSubidos)
  //   })
  // }
}
