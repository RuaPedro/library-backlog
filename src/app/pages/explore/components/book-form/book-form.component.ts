import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import IBook from '../../../../interfaces/book/book.interface';
import Book from '../../../../models/book.model';
import { BookService } from '../../../../services/book/book.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import IBookAuthor from '../../../../interfaces/book/book-author.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-form',
  imports: [
    CommonModule,
    MatChipsModule,
    MatDivider,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<BookFormComponent>);
  readonly data = inject<Book | null>(MAT_DIALOG_DATA);
  readonly currentDatetime = new Date();

  public mode: 'create' | 'update' = 'create';
  public isLoading: boolean = false;

  public book: IBook = {
    id: '',
    key: '',
    cover: {
      id: '',
      urls: {
        large: '',
        small: '',
        medium: '',
      },
    },
    pages: 0,
    title: '',
    authors: [],
    language: '',
    subjects: [],
    description: '',
    publish_year: '',
  };

  constructor(
    private bookService: BookService,
    private toastService: ToastrService,
  ) {}

  get invalidBook() {
    const validations = [
      !this.book.key?.trim(),
      !this.book.cover?.urls?.large?.trim(),
      !this.book.cover?.urls?.medium?.trim(),
      !this.book.cover?.urls?.small?.trim(),
      !this.book.pages,
      !this.book.title?.trim(),
      !this.book.authors?.length,
      !this.book.publish_year,
    ];

    return validations.some((element) => element == true);
  }

  ngOnInit(): void {
    if (this.data) {
      this.mode = 'update';
      this.book = structuredClone(this.data as IBook);
    }

    console.log(this.book);
  }

  public addAuthor(authorName: string) {
    const author: IBookAuthor = {
      id: '',
      name: authorName,
    };

    if (this.book.authors) this.book.authors.push(author);
    else this.book.authors = [author];
  }

  public removeAuthor(index: number) {
    this.book.authors.splice(index, 1);
  }

  public addSubject(subject: string) {
    if (this.book.subjects) this.book.subjects.push(subject);
    else this.book.subjects = [subject];
  }

  public removeSubject(index: number) {
    this.book.subjects.splice(index, 1);
  }

  public saveBook() {
    if (this.mode == 'update') this.updateBook();
    else this.createBook();
  }
//Pedro Rua
  private createBook() {
    this.isLoading = true;
    this.bookService.create(this.book).subscribe({
      next: () => {
        this.toastService.success('Book created');
        this.dialogRef.close(true);
      },
      error: () => {
        this.toastService.error('Error creating book');
        this.dialogRef.close(false);
      }
    });
  }

  private updateBook() {
    this.isLoading = true;
    const bookId: string = this.book.id || '';
    this.bookService.update(bookId, this.book).subscribe({
      next: () => {
        this.toastService.success('Book updated');
        this.dialogRef.close(true);
      },
      error: () => {
        this.toastService.error('Error updating book');
        this.dialogRef.close(false);
      }
    });
  }
}
