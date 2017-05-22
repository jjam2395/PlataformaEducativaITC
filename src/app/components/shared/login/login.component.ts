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
  user=this._ls.user;

  constructor(private _ls: LoginService, private router:Router) {
    
    // this.user =this._ls.afAuth.auth.onAuthStateChanged(function(user) {
    //     if (user) {
    //       console.log("componente:",user);
    //     } else {
    //       // No user is signed in.
    //       console.log("componente, usuario no logueado");
    //     }
    // });
    

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
