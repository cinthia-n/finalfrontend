import {Component, Inject, OnInit} from '@angular/core';
import {Employee} from '../shared/employee';
import {EmployeeService} from '../services/employee.service';
import {LoginComponent} from '../login/login.component';
import {MatDialog} from '@angular/material';
import {RegEmployeeComponent} from '../reg-employee/reg-employee.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestService} from '../services/request.service';
import {AppURL} from '../shared/appUrl';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  panelOpenState = false;

  employees: Employee[];
  employees2: Employee[];
  user: FormGroup;
  public url = AppURL.getUrlEmployee();

  constructor(private http: HttpClient, private employeeService: EmployeeService,
              public dialog: MatDialog, private requestService: RequestService,
              @Inject('BaseURL') private BaseURL) {
  }
  // "firstName": "John kintaro",
  // "lastName": "Doe",
  // "image": null,
  // "jobPosition": null,
  // "jobCode": null,
  // "featured": true,
  // "jobDescription": "Descripcion de job"
  ngOnInit() {

    this.employeeService.getEmployees2().subscribe(employees2 => {
      return this.employees2 = employees2;
    });

    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
    this.user = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      jobPosition: new FormControl('', Validators.required),
      jobCode: new FormControl('', Validators.required),
      featured: new FormControl('', Validators.required),
      jobDescription: new FormControl('', Validators.required)
    });
  }
  onSubmit() {
    this.requestService.add(this.url, this.user.value, []).subscribe(
      response => {
      //  this.user.reset();
        //  this.router.navigate(['/compra']);
      },
      error => {
        console.log(error);
      }
    );
    console.log( this.user.value);
  }

 /* onBorrar2(id: number): Observable<any> {
    console.log('vamos ');
    console.log(this.url+'/'+id);

    // console.log(this.requestService.delete(this.url, id));
    // return this.http.delete(`${this.baseUrl2}/${id}`, { responseType: 'text' });
    // return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    return this.requestService.delete(this.url, id);
  }*/

  /*deleteUser(user){ this.requestService.delete(this.url, '3').subscribe(
      (data)=>{
      this.user.splice(this.user.indexOf(user), 1);
    },(error)=>{
      console.log(error);
    });
  }*/
  /*borrar(archivoParaBorrar) {
    const url = `http://localhost/api/public/delete/${archivoParaBorrar.user_id}`;

    this._http.delete(url).subscribe(data => {
      console.log('se ha borrado correctamente');
      let index = archivo.indexOf(archivoParaBorrar, 0);
      if (index > -1) {
        archivo.splice(index, 1); // Tu array de archivos
      }
    }, error => {
      console.log('error');
    });
  }*/

  onBorrar() {
    this.requestService.delete(this.url, 1).subscribe(
      response => {
        // this.router.navigate(['../'], { relativeTo: this.route });
        // this.successDeleted(res);
        //  this.user.reset();
        //  this.router.navigate(['/compra']);
      },
      error => {
        console.log('hay errores ');
        console.log(error);
      }
    );
    console.log( this.user.value);
    // console.log('ivancete delete');
  }
  openRegEmployee() {
    this.dialog.open(RegEmployeeComponent, {width: '500px', height: '450px'});
  }


}
