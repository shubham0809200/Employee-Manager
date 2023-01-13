import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  public employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    public _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        this._snackBar.open('Error getting employees', 'OK', {
          duration: 3000,
        });
      }
    );
  }

  openDialog(employee: Employee) {
    try {
      const dialogRef = this.dialog.open(EmployeeFormComponent, {
        maxWidth: '50%',
        minWidth: '30%',
        data: employee,
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        this.getEmployees();
      });
    } catch (error) {
      console.log(error);
    }
  }

  addEmployee() {
    const employee: Employee = {
      id: 0,
      name: '',
      email: '',
      jobTitle: '',
      phone: 0,
      imageUrl: '',
      employeeCode: '',
    };
    this.openDialog(employee);
  }

  confirmDelete(employee: Employee) {
    try {
      const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
        width: '30%',
        data: employee,
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        this.getEmployees();
      });
    } catch (error) {
      console.log(error);
    }
  }

  // search Employee
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (
        employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.phone.toString().indexOf(key) !== -1 ||
        employee.employeeCode.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }
}
