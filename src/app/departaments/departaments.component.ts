import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DepartamentService} from './departaments.service';
import{DepartamentsDTO,DepartamentsUpdateDTO} from './Departament';
import { Router } from '@angular/router';
import {EnterpriseService}from '../enterprise/enterprises.service';



@Component({
  selector: 'app-departaments',
  templateUrl: './departaments.component.html',
  styleUrls: ['./departaments.component.css']
})
export class DepartamentsComponent  implements OnInit {

  dataEnterprise: any;
  dataDepartaments:any;
  dataCount: number = 0;

  nameEnterprise:string='';
  name='';
  description='';
  phone='';
  entrerprisesId=0;
  enterpriseSelect:any;
  enterprise:any;

  nameUpdate='';
  descriptionUpdate='';
  phoneUpdate='';
  idDepartament:number=0;

  idEnterprise:number=0;
  statusUpdate=false;

  departamentForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    phone: new FormControl(''),
    enterpriseSelect:new FormControl()
  });

  departamentUpdateForm = new FormGroup({
    nameUpdate: new FormControl(''),
    descriptionUpdate: new FormControl(''),
    phoneUpdate: new FormControl(''),
    statusUpdate:new FormControl(false),
    idDepartament:new FormControl(0),
    enterpriseSelect:new FormControl()


  });

  @ViewChild("myModalInfo", { static: false })
  myModalInfo!: TemplateRef<any>;
  @ViewChild("myModalConf", { static: false })
  myModalConf!: TemplateRef<any>;


  constructor(private departamentService: DepartamentService,
    private enterpriseService: EnterpriseService, private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    this.retrieveDepartaments();
  }

  retrieveDepartaments(): void {
    this.departamentService.geDepartaments()
      .subscribe(
        response => {
          const { data } = response;
          this.dataDepartaments = data;
          this.dataCount = data.lenght;

          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  mostrarModalInfo() {
    this.modalService.open(this.myModalInfo);
    this.retrieveEnterprises();
  }

  showDepartament(event:any,departament:any){
    this.modalService.open(this.myModalConf);
    this.retrieveDepartaments();

    const{id,name,phone,description,status,entrerprises}=departament;
    //console.log(enterprises);
    const{id:idEnterprises,name:nameEnterprise}=entrerprises;
    this.nameUpdate=name;
    this.descriptionUpdate=description;
    this.phoneUpdate=phone;
    this.idDepartament=id;
    this.statusUpdate=status;
    this.nameEnterprise=nameEnterprise;
    this.idEnterprise=idEnterprises;
    
  }

  onEdit() {
    const{idDepartament,nameUpdate,descriptionUpdate,phoneUpdate,statusUpdate}=this.departamentUpdateForm.value;

    const responseEditDepartament: DepartamentsUpdateDTO = {
       name:nameUpdate,description:descriptionUpdate,phone:phoneUpdate,entrerprisesId:this.idEnterprise,status:statusUpdate
       }as DepartamentsUpdateDTO;

     console.log(responseEditDepartament);
      
    this.departamentService.
    updateDepartaments(responseEditDepartament,idDepartament as number)
    .subscribe(
      response => {
        const {message}=response;
        
        console.log(response);
        this.retrieveDepartaments();
      },
      error => {
        console.log(error);
        
      });
  }


  onCreate(){
    const{enterpriseSelect,name,description,phone}=this.departamentForm.value;

    
    const responseCreateDepartaments: DepartamentsDTO = {
       name,description,phone,entrerprisesId:enterpriseSelect }as DepartamentsDTO;

       console.log(responseCreateDepartaments);

    this.departamentService.
    createDepartaments(responseCreateDepartaments)
    .subscribe(
      response => {
        const {message}=response;
        //this.toastService.show('Enterprise',message);
        console.log(response);
        this.retrieveDepartaments();
      },
      error => {
        console.log(error);
        
      });
  }

  retrieveEnterprises(): void {
    this.enterpriseService.getEterprise()
      .subscribe(
        response => {
          const { data } = response;
          this.dataEnterprise = data;
          console.log(this.dataEnterprise);
        },
        error => {
          console.log(error);
        });
  }

  changeEnterprise(e: any) {
    this.entrerprisesId=e.target.value;
  }
}
