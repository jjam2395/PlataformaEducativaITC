import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Router } from '@angular/router';
declare var $:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forma:FormGroup; //login
  formaRegistro:FormGroup;

  constructor(private _ls: LoginService, private router:Router) {
    //FORMULARIO PARA EL LOGIN
      this.forma = new FormGroup({
        'email': new FormControl('',Validators.pattern("[0-9]{8}@itcuautla\.edu\.mx")),
        'password': new FormControl('',[Validators.required, Validators.minLength(8)])
      });

       $('#modal1').modal('open');
       $('#modal2').modal('open');
   }
   // [0-9]{8}+@itcuautla.edu.mx
  
  ngOnInit() {
    // console.log(this._ls.user);
  }

  login(){
    // SE LLAMA A LA FUNCION DE LOGIN EN EL SERVICIO
   if(this.forma.valid){
     console.log("se logueara al usuario")
     this._ls.login(this.forma.value.email,this.forma.value.password);
     this._ls.user.subscribe((res)=>{
       if(res){
         if(res.emailVerified==false){
         console.log("el usuario no ah verificado su email");
         this._ls.sendVerificationEmail();
         }else{
           console.log("el email a sido verificado");
           this.router.navigate(['/inicio-alumno']);
         }
       }
     })
   }else{
     console.error("Los datos no son correctos");
   }

   // setTimeout(function(){
   //   console.log(this._ls.user); 
   // },5000);
   //CHECAR SI EL USUARIO YA VERIFICO SU CORREO

   // console.log(this._ls.user);

   // CHECAR SI EL USUARIO ESTA LOGUEADO CORRECTAMENTE PARA REDIRIGIRLO A SU INICIO
   // if(this._ls.user){
   //   this.router.navigate(['/inicio-alumno'])
   // }else{
   //   console.log("no redirigiendo");
   // }
   
  }

  registrar(){
    console.log(this.forma.value);
    this._ls.registrar(this.forma.value.email, this.forma.value.password);
  }

  logout(){
  	this._ls.logout();
  }

  getstate(){
    // console.log("uid del usuario: "+this._ls.getStateUser());
    console.log(this._ls.user);
  }

}
