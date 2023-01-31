import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { DepartamentsComponent } from './departaments/departaments.component';
import { EmployeesComponent } from './employees/employees.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { AutenticationComponent } from './autentication/autentication.component';
import { DataTablesModule } from "angular-datatables";


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', component: AutenticationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'layout', component: LayoutComponent },
  { path: 'enterprises', component: EnterpriseComponent },
  { path: 'departaments', component: DepartamentsComponent },
  { path: 'employees', component: EmployeesComponent },

  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

];

const routes1: Routes = [
  { path: '', component: AutenticationComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'layout', component: LayoutComponent, children: [

      {
        path: 'enterprises', // child route path
        component: EnterpriseComponent, // child route component that the router renders
      },
      {
        path: 'departaments',
        component: DepartamentsComponent, // another child route component that the router renders
      },
      {
        path: 'employees',
        component: EmployeesComponent, // another child route component that the router renders
      },
    ]
  },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page



];

@NgModule({
  declarations: [
    AppComponent,
    EnterpriseComponent,
    PageNotFoundComponent,
    LayoutComponent,
    AutenticationComponent,
    DepartamentsComponent,
    EmployeesComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    DataTablesModule,
    FormsModule,
    RouterModule.forRoot(routes1)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  

}
