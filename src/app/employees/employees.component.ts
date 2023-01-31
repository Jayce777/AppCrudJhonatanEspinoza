import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnterpriseService } from '../enterprise/enterprises.service';
import { AppToastService } from '../toast/toast.service';
import { EmployeeDTO, EmployeeUpdateDTO } from './Employee';
import { EmployeeService } from './employee.service';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  dataEmployee: any;
  dataCount: number = 0;
  name: string = '';
  surname: string = '';
  age: number = 0;
  email: string = '';
  position: string = '';

  nameUpdate: string = '';
  surnameUpdate: string = '';
  ageUpdate: number = 0;
  emailUpdate: string = '';
  positionUpdate: string = '';
  idemployee: number = 0;
  statusUpdate: any;

  @ViewChild("myModalInfo", { static: false })
  myModalInfo!: TemplateRef<any>;
  @ViewChild("myModalConf", { static: false })
  myModalConf!: TemplateRef<any>;

  employeeForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    age: new FormControl(0),
    email: new FormControl(),
    position: new FormControl('')
  });

  employeeUpdateForm = new FormGroup({
    nameUpdate: new FormControl(''),
    surnameUpdate: new FormControl(''),
    ageUpdate: new FormControl(0),
    emailUpdate: new FormControl(),
    positionUpdate: new FormControl(''),
    idemployee: new FormControl(0),
    statusUpdate: new FormControl(false)
  });


  constructor(private employeService: EmployeeService,
    private enterpriseService: EnterpriseService, private router: Router,
    private modalService: NgbModal, public toastService: AppToastService) { }

  ngOnInit(): void {

    this.retrieveEmployee();
  }

  showEmployee(event: any, employee: any) {

    this.modalService.open(this.myModalConf);
    const { name, surname, age, email,
      position, id, status } = employee;

    this.nameUpdate = name;
    this.surnameUpdate = surname;
    this.ageUpdate = age;
    this.emailUpdate = email;
    this.positionUpdate = position;
    this.idemployee = id;
    this.statusUpdate = status;
  }

  onEdit() {
    const { nameUpdate, surnameUpdate, ageUpdate, emailUpdate,
      positionUpdate, idemployee, statusUpdate } = this.employeeUpdateForm.value;

    const reponseEditEmployee: EmployeeUpdateDTO = {
      name: nameUpdate, surname: surnameUpdate, age: ageUpdate,
      email: emailUpdate, position: positionUpdate, status: statusUpdate
    } as EmployeeUpdateDTO;

    this.employeService.updateEmployees(reponseEditEmployee, idemployee as number)
      .subscribe(
        response => {
          const { data } = response;
          this.dataEmployee = data;
          this.retrieveEmployee();
          //console.log(this.dataEmployee);
        },
        error => {
          console.log(error);
        });

  }

  mostrarModalInfo() {
    this.modalService.open(this.myModalInfo);
  }
  retrieveEmployee(): void {
    this.employeService.geEmployees()
      .subscribe(
        response => {
          const { data } = response;
          this.dataEmployee = data;
          this.dataCount = data.lenght;
        },
        error => {
          console.log(error);
        });
  }
  onCreate() {
    const { name, surname, age, position, email } = this.employeeForm.value;

    const responseCreateEmployee: EmployeeDTO = {
      name, surname, age, position, email
    } as EmployeeDTO;

    this.employeService.
      createEmployees(responseCreateEmployee)
      .subscribe(
        response => {
          const { message } = response;
          //this.toastService.show('Enterprise',message);
          console.log(response);
          this.retrieveEmployee();
        },
        error => {
          console.log(error);

        });
  }

}
