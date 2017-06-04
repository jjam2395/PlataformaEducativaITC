import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { UsuarioAlumnoService } from "./usuarioAlumno.service";

@Injectable()
export class LoginService {
  user: Observable<firebase.User>;
  banderaEmail: boolean = false;
  error: string;
  resultado: any;
  preloader: boolean;

  constructor(private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public router: Router,
    public _ua:UsuarioAlumnoService) {
    this.user = afAuth.authState;
    this.error = null; //MOSTRAR MENSAJES DE ERROR
    this.resultado = null; //MOSTRAR MENSAJES EXITOSOS
    this.preloader = false; //INDICAR SI SE DEBE MOSTRAR EL PRELOADER O NO
  }

  //CREAR USUARIO CON CORREO Y CONTRASEÑA
  registrar(formulario) {
    this.resultado = null; //MOSTRAR MENSAJES EXITOSOS
    this.preloader = false;
    this.preloader = true;
    this.afAuth.auth.createUserWithEmailAndPassword(formulario.email, formulario.password).then((result) => {
      //FORMATO DE LA INFORMACION QUE SE GUARDARA 
      let data;
      if(formulario.tipoUserCrear=="alumnos"){
          data={
          displayName: formulario.nombre,
          carrera: formulario.carrera,
          email: result.email==null ? '' : result.email,
          photoURL: result.photoURL==null ? '' : result.photoURL 
        }
      }else if(formulario.tipoUserCrear!="alumnos"){
          data={  
          displayName: formulario.nombre,
          email: result.email==null ? '' : result.email,
          photoURL: result.photoURL==null ? '' : result.photoURL 
        }
      }      
      //SI TODO SE EJECUTA CORRECTAMENTE LOS MENSAJES DE ERROR Y PRELOADER SE PONE EN FALSE
      console.log(`Registro exitoso ${JSON.stringify(result)}`);
      this.error = null;
      this.resultado = "Registro exitoso"
      this.preloader = false;

      //SE ENVIA UN CORREO DE VERIFICACION A LA CUENTA Y SE GURDAN LOS DATOS BASICOS DEL USUARIO
      this.sendVerificationEmail();
      this._ua.saveUser(result.uid,data,formulario.tipoUserCrear);
    }).catch((error) => {
      //SI OCURRE ALGUN ERROR SE GUARDA EL MENSAJE DE ERROR Y RESULTADO A NULL
      if (error.message == "The email address is already in use by another account.") {
        this.error = "La dirección de email ya se encuentra en uso."
        this.resultado = null
        this.preloader = false;
      }
    })
  }

  // AUTENTICACION CON CORREO Y CONTRASEÑA
  login(email, password, tipoUserLogeado): any {
    this.resultado = null; //MOSTRAR MENSAJES EXITOSOS
    this.preloader = false;
    this.preloader = true;
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then((result) => {
      //SI EL CORREO AH SIDO VERIFICADO
      if (result.emailVerified == true) {
        //VERIFICAR QUE EXISTA EN EL REGISTRO QUE DICE

        console.log("Logeo exitoso", result);
        //GUARDAMOS EL OBJETO DE USER EN LOCAL STORAGE PARA SU COMPROBACION EN EL GUARD Y QUE NO SE PIERDA AL RECARGAR
        localStorage.setItem('user', JSON.stringify(result)); 
        localStorage.setItem('tipoUserLogeado', tipoUserLogeado );
        //REDIRECCIONAR AL INICIO DEL ALUMNO
        if(tipoUserLogeado=="alumnos"){
          this.router.navigate(['/inicio-alumno']);
        }else if(tipoUserLogeado=="administradores"){
          this.router.navigate(['/registro']);
        }else if(tipoUserLogeado=="maestros"){
          console.log("se ha logeado un maestro");
        }
        
    } else {
        this.error = "Necesitas validar tu correo electrónico"
      }
      this.preloader = false;
    }).catch((error) => {
      console.error(`Error al iniciar sesion ${error.message}`);
      if (error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
        this.error = "Esta cuenta no se encuentra registrada";
      } else if (error.message == "The password is invalid or the user does not have a password.") {
        this.error = "Contraseña invalida";
      } else {
        this.error = error.message;
      }
      this.preloader = false;
    });
  }

  logout() {
    this.preloader = true;
    this.afAuth.auth.signOut().then((result) =>{
      console.log("Sign-out successful.");
      localStorage.removeItem('user');
      localStorage.removeItem('tipoUserLogeado');
      this.preloader = false;
    }).catch(error=> {
      console.log(`An error happened. ${error}`);
      this.preloader=false;
    });
  }

  sendVerificationEmail() {
    if (this.banderaEmail == false) {
      this.banderaEmail = true;
      let usuario = firebase.auth().currentUser;

      usuario.sendEmailVerification().then(function () {
        console.log("Email sent.");
        this.banderaEmail = true;
      }, function (error) {
        console.log("An error happened.");
        console.error(error);
      });
    }
  }
}


