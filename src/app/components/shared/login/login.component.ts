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
  forma:FormGroup;

  constructor(private _ls: LoginService, private router:Router) {
      this.forma = new FormGroup({
        'email': new FormControl('',Validators.pattern("[0-9]{8}@itcuautla\.edu\.mx")),
        'password': new FormControl('',[Validators.required])
      });
   }
   // [0-9]{8}+@itcuautla.edu.mx
  
  ngOnInit() {
    // console.log(this._ls.user);
  }

  login(){
    console.log(this.forma);
    console.log(this.forma.value);

    //SE LLAMA A LA FUNCION DE LOGIN EN EL SERVICIO
   /*this._ls.login();
   // console.log(this._ls.user);

   // CHECAR SI EL USUARIO ESTA LOGUEADO CORRECTAMENTE PARA REDIRIGIRLO A SU INICIO
   if(this._ls.user){
     this.router.navigate(['/inicio-alumno'])
   }else{
     console.log("no redirigiendo");
   }*/
   
  }

  logout(){
  	this._ls.logout();
  }

}
