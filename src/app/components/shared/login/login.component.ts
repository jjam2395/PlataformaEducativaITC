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
  user=this._ls.user;

  constructor(private _ls: LoginService, private router:Router) {
    
    //REGLAS DE VALIDACION PARA EL FORMULARIO DE LOGIN
      this.forma = new FormGroup({
        'email': new FormControl('',[Validators.required, Validators.pattern("[0-9]{8}@itcuautla\.edu\.mx")]),
        'password': new FormControl('',[Validators.required, Validators.minLength(8)])
      });
   }
  
  ngOnInit() {
  }


  login(){
    // SE LLAMA A LA FUNCION DE LOGIN EN EL SERVICIO
  if(this.forma.valid){
    console.log("llamado a la funcion del servicio login");
    this._ls.login(this.forma.value.email,this.forma.value.password);
  
    this.user.subscribe((result)=>{
    console.log("desde el componente",result);
      if(result){
        if(result.emailVerified==false){
          console.error("llamando funcion enviar email desde el componente");
          this._ls.sendVerificationEmail();
        }
      }   
    });
  }else{
    console.error("el formato de los datos no es correcto");
  }
  }

  logout(){
  	this._ls.logout();
  }

  getstate(){
    // console.log("uid del usuario: "+this._ls.getStateUser());
    console.log(this._ls.user);
  }

}
