import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private taskservice: TaskService,
    private _dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.form = this._fb.group({
      taskId: new FormControl('', [Validators.required]),
      taskName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.form.valid) {
      if (this.data) {
        this.taskservice
          .updateTask(this.data.id, this.form.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.taskservice.addTask(this.form.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}

