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
        'email': new FormControl('',[Validators.required, Validators.pattern("[0-9]{8}@itcuautla\.edu\.mx")]),
        'password': new FormControl('',[Validators.required, Validators.minLength(8)])
      });

      this._ls.user.subscribe(result=>{
        if(localStorage.getItem('user')){
          this.logeado=true;
        }else{
          this.logeado=false;
        }
      })
   }
  
  ngOnInit() {
  }


  login(){
    // SE LLAMA A LA FUNCION DE LOGIN EN EL SERVICIO
  if(this.forma.valid){
    this._ls.login(this.forma.value.email,this.forma.value.password);  
    //SUSCRIBIRSE AL BOSERVABLE DE USER 
    this._ls.user.subscribe((result)=>{
      if(result){
        if(result.emailVerified==true){
          console.log(result)
          console.log("redirigiendo a al inicio del alumno");
          this.router.navigate(['/inicio-alumno']);
        }else{
          console.log("primero verifica tu email");
        }
      }else{
        console.log("redirigiendo al home")
      }   
    });  
  }else{
    console.error("el formato de los datos no es correcto");
  }
  }

  logout(){
  	this._ls.logout();
    this.router.navigate(['/home']);
  }
}
