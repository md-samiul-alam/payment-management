import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-user-dialog',
  imports: [],
  templateUrl: './view-user-dialog.component.html',
  styleUrl: './view-user-dialog.component.css'
})
export class ViewUserDialogComponent {
  public user: any

  constructor(
    public dialogRef: MatDialogRef<ViewUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.user = data;
  }
}
