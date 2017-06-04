import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class DudasService {
  dudas: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) {

   }

  enviarDuda(email,duda){
    console.log("si funciona el servicio de dudas :)");
    let refDuda=this.db.list('/dudas/');
    refDuda.push({email,duda});
  }

responderDuda(key, respuesta){

  let refDudak=this.db.list('/dudas/',key)
  refDudak.update(key,respuesta);
}


cargarDudas(){
  console.log("se esta cargando el srvicio de cargar dudas")
this.dudas = this.db.list('/dudas/');
return this.dudas;
}

}
