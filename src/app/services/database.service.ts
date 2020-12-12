import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
export interface Dep {
  id: number,
  nombre: string,
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  departamentos = new BehaviorSubject([]);
  empleados = new BehaviorSubject([]);
 
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'empresa.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
  }
 
  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadDepartamentos();
          this.loadEmpleados();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }
 
  getDatabaseState() {
    return this.dbReady.asObservable();
  }
 
  getDeps(): Observable<Dep[]> {
    return this.departamentos.asObservable();
  }
 
  getEmpleados(): Observable<any[]> {
    return this.empleados.asObservable();
  }


  loadDepartamentos(){
    return this.database.executeSql('SELECT * FROM departamento', []).then(data => {
      let departamentos: Dep[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) { 
          departamentos.push({ 
            id: data.rows.item(i).id,
            nombre: data.rows.item(i).nombre
           });
        }
      }
      this.departamentos.next(departamentos);
    });
  }

  addDepartamento(nombre) {
    let data = [nombre];
    return this.database.executeSql('INSERT INTO departamento (nombre) VALUES (?)', data).then(data => {
      this.loadDepartamentos();
    });
  }
 
  getDepartamento(id): Promise<Dep> {
    return this.database.executeSql('SELECT * FROM departamento WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
        nombre: data.rows.item(0).nombre, 
      }
    });
  }
 
  deleteDepartamento(id) {
    return this.database.executeSql('DELETE FROM departamento WHERE id = ?', [id]).then(_ => {
      this.loadDepartamentos();
      this.loadEmpleados();
    });
  }
 
  updateDepartamento(dev: Dep) {
    let data = [dev.nombre];
    return this.database.executeSql(`UPDATE departamento SET nombre = ? WHERE id = ${dev.id}`, data).then(data => {
      this.loadDepartamentos();
    })
  }
 
  loadEmpleados() {
    let query = 'SELECT empleado.nombre, empleado.id, empleado.sueldo, departamento.nombre AS Departamento FROM empleado JOIN departamento ON departamento.id = empleado.deparID';
    return this.database.executeSql(query, []).then(data => {
      let empleados = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {          
          empleados.push({ 
            nombre: data.rows.item(i).nombre,
            id: data.rows.item(i).id,
            sueldo: data.rows.item(i).sueldo,
            departamento: data.rows.item(i).Departamento,
           });
        }
      }
      this.empleados.next(empleados);
    });
  }
 
  addEmpleado(nombre, sueldo, depar) {
    let data = [nombre, sueldo, depar];
    console.log(data);
    return this.database.executeSql('INSERT INTO empleado (nombre, sueldo, deparID) VALUES (?, ?, ?)', data).then(data => {
      this.loadEmpleados();
    });
  }


  getEmpleadosDepar(id) {
    return this.database.executeSql('SELECT * FROM empleado WHERE deparID = ?', [id]).then(data => {
      let empleados = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {          
          empleados.push({ 
            nombre: data.rows.item(i).nombre,
            sueldo: data.rows.item(i).sueldo,
           });
        }
      }
      return empleados;
    });
  }
}
