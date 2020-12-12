import { Component, OnInit } from '@angular/core';
import { DatabaseService, Dep } from 'src/app/services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.page.html',
  styleUrls: ['./departamentos.page.scss'],
})
export class DepartamentosPage implements OnInit {

  departamentos: Dep[] = [];
 
  empleados: Observable<any[]>;
 
  departamento = {};
  empleado = {};
 
  selectedView = 'departamentos';
 
  constructor(private db: DatabaseService) { }
 
  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getDeps().subscribe(devs => {
          this.departamentos = devs;
        })
        this.empleados = this.db.getEmpleados();
      }
    });
  }
 
  addDepartamento() {
    
    this.db.addDepartamento(this.departamento['nombre'])
    .then(_ => {
      this.departamento = {};
    });
  }
 
  addEmpleado() {
    this.db.addEmpleado(this.empleado['nombre'], this.empleado['sueldo'], this.empleado['deparID'])
    .then(_ => {
      this.empleado = {};
    });
  }

  searchChanged(){
    console.log("Cambio");
  }

}
