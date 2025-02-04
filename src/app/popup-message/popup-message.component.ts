import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-popup-message',
  imports: [
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './popup-message.component.html',
  styleUrl: './popup-message.component.css'
})
export class PopupMessageComponent {
  message: string;
  constructor(
    public dialogRef: MatDialogRef<PopupMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.message = data.message;
  }
}
