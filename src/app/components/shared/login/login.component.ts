import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _ls: LoginService, private router:Router) {
   }

  ngOnInit() {
    // console.log(this._ls.user);
  }

  login(){
    //SE LLAMA A LA FUNCION DE LOGIN EN EL SERVICIO
   this._ls.login();
   // console.log(this._ls.user);

   // CHECAR SI EL USUARIO ESTA LOGUEADO CORRECTAMENTE PARA REDIRIGIRLO A SU INICIO
   if(this._ls.user){
     this.router.navigate(['/inicio-alumno'])
   }else{
     console.log("no redirigiendo");
   }
   
  }

  logout(){
  	this._ls.logout();
  }

}
