import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { RouterModule } from '@angular/router';

// Angular Metrial
import { AngularMaterialModule } from './model/angular-material/angular-material.models';

//Services
import { EmployeeService } from './services/employee/employee.service';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { DeleteEmployeeComponent } from './components/delete-employee/delete-employee.component';

@NgModule({
  declarations: [AppComponent, EmployeeComponent, EmployeeFormComponent, DeleteEmployeeComponent],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([{ path: '', component: EmployeeComponent }], {
      initialNavigation: 'enabled',
    }),
  ],
  providers: [EmployeeService],
  entryComponents: [EmployeeFormComponent, DeleteEmployeeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
