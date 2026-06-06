import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-modal',
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogClose,
    MatIconModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogActions,
  ],
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.scss',
})
export class ImageModalComponent {
  readonly dialogRef = inject(MatDialogRef<ImageModalComponent>);
  readonly data = inject<{
    title: string;
    src: string;
  }>(MAT_DIALOG_DATA);

  public close() {
    this.dialogRef.close();
  }
}
