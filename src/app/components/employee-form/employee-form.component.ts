import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  public employee: Employee = {
    id: 0,
    name: '',
    email: '',
    jobTitle: '',
    phone: 0,
    imageUrl: '',
    employeeCode: '',
  };

  // create a form group and add the form controls
  employeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    jobTitle: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,

    public employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employee = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.employee.id === 0) {
      this.employeeService
        .addEmployee(this.employee)
        .subscribe((response: Employee) => {
          console.log(response);
          this.onNoClick();
        });
    } else {
      this.employeeService
        .updateEmployee(this.employee)
        .subscribe((response: Employee) => {
          console.log(response);
          this.onNoClick();
        });
    }
  }
}
