import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginService {
	user:{}=null;

  constructor(private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
      if(localStorage.getItem('user')){
        this.user=localStorage.getItem('user');
      }else{
        this.user=null;
      }
  }
  
  // AUTENTICACION CON GOOGLE
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    	.then(result =>{
      // ALMACENAMOS LOS DAOTS DEL USUAIRO LOGEGADO EN LOCALSTORAGE
      localStorage.setItem('user',JSON.stringify(result));
      // TAMBIEN EN LA VARIABLE LOCAL
      this.user=JSON.stringify(result);
    	}); 
  }

  logout() {
    this.afAuth.auth.signOut().then(function(){
      localStorage.removeItem('user');
      this.user=null;
    	console.log("sign-out successful")
    });
  }
}


 