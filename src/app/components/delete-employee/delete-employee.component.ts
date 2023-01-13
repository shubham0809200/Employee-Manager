import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
})
export class DeleteEmployeeComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    public employeeService: EmployeeService,
    public _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public deleteEmployee(): void {
    this.employeeService.deleteEmployee(this.data.id).subscribe(
      (response: void) => {
        this._snackBar.open('Employee deleted successfully', 'OK', {
          duration: 3000,
        });
      },
      (error: HttpErrorResponse) => {
        this._snackBar.open('Error deleting employee', 'OK', {
          duration: 3000,
        });
      }
    );
    this.closeDialog();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
