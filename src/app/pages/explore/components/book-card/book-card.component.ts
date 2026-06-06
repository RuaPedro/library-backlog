import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import Book from '../../../../models/book.model';
import { BadgeComponent } from '../../../../components/general/badge/badge.component';

@Component({
  selector: 'app-book-card',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    BadgeComponent,
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  @Input() public book: Book = new Book();
  @Output() displayCover = new EventEmitter<Book>();
  @Output() updateBook = new EventEmitter<Book>();
  @Output() deleteBook = new EventEmitter<Book>();
}
