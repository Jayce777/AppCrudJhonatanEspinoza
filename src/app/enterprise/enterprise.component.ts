import { Component, OnInit, ViewChild ,TemplateRef} from '@angular/core';
import { EnterpriseService } from './enterprises.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import {EnterpriseDTO,EnterpriseUpdateDTO}from './Enterprise';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})


export class EnterpriseComponent implements OnInit {

  
  dataEnterprise: any;
  dataCount: number = 0;

  name='';
  address='';
  phone='';

  nameUpdate='';
  addressUpdate='';
  phoneUpdate='';
  idEnterprise:number=0;

  enterpriseForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
  });

  enterpriseUpdateForm = new FormGroup({
    nameUpdate: new FormControl(''),
    addressUpdate: new FormControl(''),
    phoneUpdate: new FormControl(''),
    idEnterprise:new FormControl(0)


  });

  @ViewChild("myModalInfo", { static: false })
  myModalInfo!: TemplateRef<any>;
  @ViewChild("myModalConf", { static: false })
  myModalConf!: TemplateRef<any>;


  constructor(private enterpriseService: EnterpriseService, private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    this.retrieveEnterprises();
  }

  retrieveEnterprises(): void {
    this.enterpriseService.getEterprise()
      .subscribe(
        response => {
          const { data } = response;
          this.dataEnterprise = data;
          this.dataCount = data.lenght;
        },
        error => {
          console.log(error);
        });
  }


  mostrarModalInfo() {
    this.modalService.open(this.myModalInfo);
  }

  showEnterprise(event:any,enterprise:any){
    this.modalService.open(this.myModalConf);
 
    const{id,name,phone,address}=enterprise;
    this.nameUpdate=name;
    this.addressUpdate=address;
    this.phoneUpdate=phone;
    this.idEnterprise=id;
  }

  onEdit() {
    const{idEnterprise,nameUpdate,addressUpdate,phoneUpdate}=this.enterpriseUpdateForm.value;

    const responseEditEnterprise: EnterpriseUpdateDTO = { name:nameUpdate,address:addressUpdate,phone:phoneUpdate }as EnterpriseUpdateDTO;
    this.enterpriseService.
    updateEnterprise(responseEditEnterprise,idEnterprise as number)
    .subscribe(
      response => {
        const {message}=response;
        console.log(response);
        this.retrieveEnterprises();
      },
      error => {
        console.log(error);
        
      });
  }


  onCreate(){
    const{name,address,phone}=this.enterpriseForm.value;

    const responseCreateEnterprise: EnterpriseDTO = { name,address,phone }as EnterpriseDTO;
    this.enterpriseService.
    createEnterprise(responseCreateEnterprise)
    .subscribe(
      response => {
        const {message}=response;
        console.log(response);
        this.retrieveEnterprises();
      },
      error => {
        console.log(error);
        
      });
  }

 
}
