import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forma:FormGroup; //login
  logeado:boolean;

  constructor(private _ls: LoginService, private router:Router) {
    if(localStorage.getItem('user')){
      this.logeado=true;
    }else{
      this.logeado=false;
    }
    //REGLAS DE VALIDACION PARA EL FORMULARIO DE LOGIN
      this.forma = new FormGroup({
        'email': new FormControl('',[Validators.required, Validators.pattern(".+@itcuautla\.edu\.mx")]),
        'password': new FormControl('',[Validators.required, Validators.minLength(8)]),
        'tipoUserLogeado': new FormControl('',[Validators.required]),
      });

      //SE SUBSCRIBE AL USER EL CUAL ES UN OBSERVADOR DEL ESTADO DEL LOGEO
      this._ls.user.subscribe(result=>{
        console.log("desde el constructor", result);
        console.log("desde constructor resultado de local",localStorage.getItem('user'))
        if(localStorage.getItem('user')){
          console.log("existe usuario logeado")
          this.logeado=true;
        }else{
          this.logeado=false;
          console.log("no existe usuario logeado")
        }
      })
   }
  
  ngOnInit() {
  }


  login(){
  //SI EL FORMULARIO ES VALIDO
  if(this.forma.valid){
    this._ls.login(this.forma.value.email,this.forma.value.password, this.forma.value.tipoUserLogeado);  
    console.log("el formulario es valido");
    //SUSCRIBIRSE AL OBSERVABLE DE USER 
    /*this._ls.user.subscribe((result)=>{
      if(result){
        if(result.emailVerified==true){
          console.log(result)
          console.log("redirigiendo a al inicio del alumno");
        }else{
          console.log("primero verifica tu email");
        }
      }else{
        console.log("redirigiendo al home")
      }   
    });  */
  }else{
    console.error("el formulario no es valido");
  }
  }

  logout(){
  	this._ls.logout();
    this.router.navigate(['/home']);
  }

  limpiar(){
    this._ls.error='';
    this._ls.resultado=null;
  }
}

//inyecciones sql
//romper proteccion de carpetas
//reconfigurar el proxy