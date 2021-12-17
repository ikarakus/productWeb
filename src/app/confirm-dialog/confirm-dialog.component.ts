import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {ConfirmDialogModel} from '../model/confirmDialogModel';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  yes: string;
  no: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.yes = data.yes;
    this.no = data.no;
  }

  ngOnInit() {
  }

  onConfirm() {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss() {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
