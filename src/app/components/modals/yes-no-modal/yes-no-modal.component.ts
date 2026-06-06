import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialogTitle,
  MatDialogActions,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-yes-no-modal',
  imports: [MatIconModule, MatButtonModule, MatDialogTitle, MatDialogActions],
  templateUrl: './yes-no-modal.component.html',
  styleUrl: './yes-no-modal.component.scss',
})
export class YesNoModalComponent {
  readonly dialogRef = inject(MatDialogRef<YesNoModalComponent>);
  readonly data = inject<string>(MAT_DIALOG_DATA);

  public returnResponse(confirmation: boolean) {
    this.dialogRef.close(confirmation);
  }
}
