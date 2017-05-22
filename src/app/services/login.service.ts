import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginService {
	user=null;

  constructor(private db: AngularFireDatabase,
    public afAuth: AngularFireAuth) {
      //CHECAR SI EXISTE USUARIO EN LOCALSTORAGE
      if(localStorage.getItem('user')){
        this.user=localStorage.getItem('user');
      }else{
        this.user=null;
      }

  }

  registrar(email,password){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    let errorMessage = error.message;
    console.log(errorMessage);
    });

    let user = firebase .auth().currentUser;
    console.log(user);
  }
  
  // AUTENTICACION CON CORREO Y CONTRASEÑA
  login(email,password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(error=>{
      var errorMessage = error.message;
      console.error(errorMessage);
    }).then(result=>{
      console.log("resultado del login",result);
      localStorage.setItem('user',JSON.stringify(result));
      this.user=result;
      console.log("uid del usuario",JSON.stringify(this.user.uid));
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.user=null;
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("Sign-out successful.");
    }).catch(function(error) {
      console.log(" An error happened.");
      console.log(error);
      // An error happened.
    });
  }

  getStateUser(){
    
  }
}


 