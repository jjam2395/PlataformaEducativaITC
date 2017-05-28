import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginService {
	 user: Observable<firebase.User>;
   banderaEmail:boolean=false;
   error:string;
   resultado:string;
   preloader:boolean;

  constructor(private db: AngularFireDatabase,
    public afAuth: AngularFireAuth) {
      this.user = afAuth.authState;
      this.error=null;
      this.resultado=null;
      this.preloader=false;
  }

  registrar(email,password){
    this.preloader=true;
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((result)=>{
      console.log(`Registro exitoso ${JSON.stringify(result)}`);
      this.error=null;
      this.resultado="Registro exitoso"
      this.preloader=false;
      this.sendVerificationEmail();
    }).catch((error)=> {
      if (error.message=="The email address is already in use by another account.") {
        this.error="La dirección de email ya se encuentra en uso."
        this.resultado=null
        this.preloader=false;
      }
    })
  }
  
  // AUTENTICACION CON CORREO Y CONTRASEÑA
  login(email,password):any{
    let resultado;
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then((result)=>{
      console.log("resultado desde el servicio",result);
      resultado=result;
      return result;
    }).catch(error=>{
      var errorMessage = error.message;
      console.error("error desde el servicio",errorMessage);
      resultado=errorMessage;
      return errorMessage;
    });
    // return resultado;
  }

  logout() {
    this.afAuth.auth.signOut().then(function() {
      // Sign-out successful.
      console.log("Sign-out successful.");
    }).catch(function(error) {
      console.log(" An error happened.");
      console.log(error);
      // An error happened.
    });
  }

  sendVerificationEmail(){
    if(this.banderaEmail==false){
      this.banderaEmail=true;
      let usuario = firebase.auth().currentUser;

      usuario.sendEmailVerification().then(function() {
        console.log("Email sent.");
        this.banderaEmail=true;
      }, function(error) {
        console.log("An error happened.");
        console.error(error);
      });
    }
  }
}


 