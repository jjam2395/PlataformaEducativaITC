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
    this.error = ''; //MOSTRAR MENSAJES DE ERROR
    this.resultado = null; //MOSTRAR MENSAJES EXITOSOS
    this.preloader = false; //INDICAR SI SE DEBE MOSTRAR EL PRELOADER O NO
  }

  //CREAR USUARIO CON CORREO Y CONTRASEÑA
  registrar(formulario, tipoUserCrear) {
    this.resultado = null; //MOSTRAR MENSAJES EXITOSOS
    this.preloader = true;
    console.log("entro a la funcion de registrar")
    console.log("formulario desde el servicio", formulario);
    console.log("tipo user desde el registro", tipoUserCrear);
    this.afAuth.auth.createUserWithEmailAndPassword(formulario.email, formulario.password).then((result) => {
      console.log("dentro de la creacion del usuario")
      //FORMATO DE LA INFORMACION QUE SE GUARDARA 
      console.log("resultado del registro desde el componente",result)
      let data;
      if(tipoUserCrear=="alumnos"){
          data={
          displayName: formulario.nombre,
          carrera: formulario.carrera,
          email: result.email==null ? '' : result.email,
          photoURL: result.photoURL==null ? '' : result.photoURL 
        }
      }else if(tipoUserCrear!="alumnos"){
          data={  
          displayName: formulario.nombre,
          email: result.email==null ? '' : result.email,
          photoURL: result.photoURL==null ? '' : result.photoURL 
        }
      }      
      //SI TODO SE EJECUTA CORRECTAMENTE LOS MENSAJES DE ERROR Y PRELOADER SE PONE EN FALSE
      console.log(`Registro exitoso ${JSON.stringify(result)}`);
      this.error = '';
      this.resultado = "Registro exitoso"
      this.preloader = false;

      //SE ENVIA UN CORREO DE VERIFICACION A LA CUENTA Y SE GURDAN LOS DATOS BASICOS DEL USUARIO
      this.sendVerificationEmail();
      this._ua.saveUser(result.uid,data,tipoUserCrear);
    }).catch((error) => {
      //SI OCURRE ALGUN ERROR SE GUARDA EL MENSAJE DE ERROR Y RESULTADO A NULL
      if (error.message == "The email address is already in use by another account.") {
        this.error = "La dirección de email ya se encuentra en uso."
        this.resultado = null
        this.preloader = false;
      }else if(error.message=="The email address is badly formatted."){
        this.error="Escribe el correo en vez copiar y pegar, porfavor."
        this.resultado = null;
        this.preloader = false;
      }
      console.error("error en la creacion del usuario",error);
    })
  }

  // AUTENTICACION CON CORREO Y CONTRASEÑA
  login(email, password, tipoUserLogeado): any {
    this.resultado = null; //MOSTRAR MENSAJES EXITOSOS
    this.preloader = true;
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then((result) => {
      console.log("el usuario existe")
      //SI EL CORREO AH SIDO VERIFICADO
      if (result.emailVerified == true) {
        console.log("el email esta verificado")
        //VERIFICAR QUE EL REGISTRO EXISTA EN EL TIPO DE USER QUE DICE
        this._ua.comprobarRegistro(tipoUserLogeado, result.uid).subscribe(user=>{
          console.log("resultado del tipo usuario",user);
          if(user.length>0){
            console.log("los datos son correctos")
            console.log("Logeo exitoso", user);
            //GUARDAMOS EL OBJETO DE USER EN LOCAL STORAGE PARA SU COMPROBACION EN EL GUARD Y QUE NO SE PIERDA AL RECARGAR
            localStorage.setItem('user', JSON.stringify(result)); 
            localStorage.setItem('tipoUserLogeado', tipoUserLogeado );
            //REDIRECCIONAR AL INICIO DEL ALUMNO
            if(tipoUserLogeado=="alumnos"){
              console.log("redirigiendo a inicio-alumno")
              this.router.navigate(['/inicio-alumno']);
            }else if(tipoUserLogeado=="administradores"){
              console.log("redirigiendo al registro")
              this.router.navigate(['/registro']);
            }else if(tipoUserLogeado=="maestros"){
              console.log("redirigiendo a inicio-maestro")
              this.router.navigate(['/inicio-maestro']);
            }
          }else if(user.length==0){
            //EL USUARIO NO EXISTE EN EL REGISTRO QUE DICE
            console.error("los datos no son correctos");
          }
        })
          
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


