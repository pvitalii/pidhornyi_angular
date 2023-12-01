import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

  @Input({ required: true }) title: string | undefined;
  @Input({ required: true }) content: string | undefined;
  @Input() formId: string | undefined;

  public onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
