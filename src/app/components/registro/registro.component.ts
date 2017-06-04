import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  forma:FormGroup; //Registro
  tipoUserLogeado; //TIPO DE USUARIO PARA DECIDIR SI CREAR 
  btnUser:string; 

  constructor(private _ls: LoginService, private router:Router) {
    //SI NO EXISTE TIPO DE USER EN LOCALSTORAGE ASIGNARLE ALUMNOS POR DEFECTO
    if(localStorage.getItem('tipoUserLogeado')==null){
      console.log("localStorage es null")
      this.tipoUserLogeado="alumnos";
    }else{
      this.tipoUserLogeado=localStorage.getItem('tipoUserLogeado');
      console.log("local styorage tiene algo")
    }
     this.forma = new FormGroup({
        'email': new FormControl('',[Validators.required, Validators.pattern(".+@itcuautla\.edu\.mx")]),
        'nombre': new FormControl('',Validators.required),
        'carrera': new FormControl('',Validators.required),
        'password': new FormControl('',[Validators.required, Validators.minLength(8)])
      });

    this.btnUser='alumnos';
   }

  ngOnInit() {
    this._ls.user.subscribe((result)=>{
      console.log(result);
      if(localStorage.getItem('tipoUserLogeado')==null){
        this.tipoUserLogeado="alumnos";
      }else{
        this.tipoUserLogeado=localStorage.getItem('tipoUserLogeado');
      }                  
    });
  }

  registrar(){
    //ENVIAMOS TODA LA INGORMACION CONTENIDA EN EL FORMULARIO AL SERVICIO DE LOGIN
    this._ls.registrar(this.forma.value,this.btnUser);
    // console.log("desde el registro componente",this.forma.value, this.btnUser)
    this.forma.reset({email:'',nombre: '',carrera:'',password:''});
  }

  seleccionUser(userSelect){
    //SE GUARDA LA OPCION DEL BOTON QUE EL ADMIN QUIERE REGISTRAR
    this.btnUser=userSelect;
  }

  continuar(){
    this._ls.error = ''; //MOSTRAR MENSAJES DE ERROR
    this._ls.resultado = ''; //MOSTRAR MENSAJES EXITOSOS
    this._ls.preloader = false;
  }
}
