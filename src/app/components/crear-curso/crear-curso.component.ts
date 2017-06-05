import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Curso } from '../../interfaces/curso.interface';
import { CursosService} from '../../services/cursos.service';
import * as firebase from 'firebase/app';

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
  newCursoKey;
  estadoSubida; //PARA SABER EL POCENTAJE QUE SE HA SUBIDO

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

    //CREACION DEL CURSO SIN MODULOS, PARA OBTENER UN UID
    this.newCursoKey= this._cursosServices.nuevoCurso(this.curso);
    console.log("llave del curso creado",this.newCursoKey);

    //SETEAR EL MODULO DE INICIO Y MOSTRAR SU VISTA
    this.moduloActual=this.curso.modulos[0];
    this.showModulos=true;
  }

  seleccionarModulo(modulo){
    this.moduloActual=modulo;
  }

  
  onChange(event) {
    // console.log(event);
    let file = event.target.files[0];
    console.log(file);

    //REFERENCIA AL STORAGE
    let storageRef = firebase.storage().ref(
        'cursos/'+ this.curso.carrera+'/'+this.newCursoKey+'/'
    );

    console.log("datos de la referencia",this.curso.carrera,this.newCursoKey)

    let task = storageRef.put(file);

    task.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot)=>{
            let porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes)*100
            // this.estadoSubida={uploadValue:porcentaje}
        },(error)=>{
            this.estadoSubida={meessage: `ha ocurrido un error ${error.message}`};
        },()=>{ 
            // firebase.database().ref('Documentos/'+this.props.user.displayName).push({
            //     titulo :file.name,
            //     downloadURL: task.snapshot.downloadURL
            // });
            this.estadoSubida({
                message:"Archivo subido"
            })
        })


    // var files = event.srcElement.files;
    // console.log(files);
  }
}
