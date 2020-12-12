import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatabaseService, Dep } from './../../services/database.service';
import { Observable } from 'rxjs';
import { element } from 'protractor';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.page.html',
  styleUrls: ['./departamento.page.scss'],
})
export class DepartamentoPage implements OnInit {

  departamento: Dep = null;
  empleados: any[];
  sueldoTotal: number;
  
 
  constructor(private route: ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController) { }
 
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let devId = params.get('id');
 
      this.db.getDepartamento(devId).then(data => {
        this.departamento = data;
        
      });

      this.db.getEmpleadosDepar(devId).then(data=>{
        this.empleados = data;
        this.sueldoTotal = 0;
        for (var i = 0; i < this.empleados.length; i++) {         
           this.sueldoTotal = this.sueldoTotal + this.empleados[i].sueldo;
        }
      })
    });
  }
 
  delete() {
    this.db.deleteDepartamento(this.departamento.id).then(() => {
      this.router.navigateByUrl('/');
    });
  }
 
  updateDeveloper() {
    this.db.updateDepartamento(this.departamento).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Departamento updated',
        duration: 3000
      });
      toast.present();
    });
  }

}
