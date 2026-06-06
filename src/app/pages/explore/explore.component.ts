import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SearchBarComponent } from '../../components/general/search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book/book.service';
import { UserBookService } from '../../services/user-book/user-book.service';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BadgeComponent } from '../../components/general/badge/badge.component';
import { forkJoin } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import IMetaResponse from '../../interfaces/general/meta-response.interface';
import Book from '../../models/book.model';
import IUserBook from '../../interfaces/user-book/user-book.interface';
import IUser from '../../interfaces/user/user.interface';
import { BookFormComponent } from './components/book-form/book-form.component';
import { YesNoModalComponent } from '../../components/modals/yes-no-modal/yes-no-modal.component';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { ImageModalComponent } from '../../components/modals/image-modal/image-modal.component';

@Component({
  selector: 'app-explore',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatMenuModule,
    SearchBarComponent,
    BadgeComponent,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BookCardComponent,
  ],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss',
})
export class ExploreComponent implements OnInit, AfterViewInit {
  @ViewChild('booksTablePaginator')
  booksTablePaginator!: MatPaginator;
  @ViewChild('booksCardsPaginator')
  booksCardsPaginator!: MatPaginator;
  @ViewChild('booksSort')
  booksSort!: MatSort;

  private loggedUser!: IUser;

  public visualizationSelected: 'grid' | 'table' = 'grid';
  public isLoadingBooks: boolean = false;
  public isLoadingUserBooks: boolean = false;

  public displayedColumns: string[] = [
    'cover',
    'key',
    'title',
    'authors',
    'pages',
    'year',
    'subjects',
    'actions'
  ];
  public pageOptions: number[] = [5, 10, 20, 50, 100];

  public booksDataSource = new MatTableDataSource<Book>();
  public booksData: Book[] = [];
  public booksMeta: IMetaResponse = {
    page: 0,
    limit: 20,
    total: 0,
    pages: 0,
  };

  constructor(
    private bookService: BookService,
    private userBookService: UserBookService,
    private toastService: ToastrService,
    public dialog: MatDialog,
  ) {
    this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '') as IUser;
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  ngAfterViewInit(): void {
    this.booksDataSource.sort = this.booksSort;
  }

  public displayCover(book: Book) {
    this.dialog.open(ImageModalComponent, {
      data: {
        title: book.title,
        src: book.cover.urls.large,
      },
    });
  }
//Pedro Rua
  public createBook() {
    this.dialog.open(BookFormComponent).afterClosed().subscribe(
      (saved: boolean) => {
        if(saved != true) return;
        this.loadBooks();
      }
    )
  }

  public updateBook(book: Book) {
    this.dialog.open(BookFormComponent, {data: book}).afterClosed().subscribe(
      (saved: boolean) => {
        if(saved != true) return;
        this.loadBooks();
      }
    )
  }

  public deleteBook(book: Book) {
    this.dialog
      .open(YesNoModalComponent, { data: 'Are you sure to delete this book?' })
      .afterClosed()
      .subscribe((confirmation: boolean) => {
        if (confirmation != true) return;

        this.bookService.delete(book.id).subscribe({
          next: () => {
            this.toastService.success('Book removed successfully');
            this.loadBooks();
          },
          error: (error: HttpErrorResponse) => this.toastService.error(error.message),
        });
      });
  }

  public onPageChange(event: PageEvent) {
    this.booksMeta.page = event.pageIndex;
    this.booksMeta.limit = event.pageSize;
    this.loadBooks();
  }

  public loadBooks() {
    this.isLoadingBooks = true;
    this.isLoadingUserBooks = true;

    forkJoin({
      bookResponse: this.bookService.get({
        limit: this.booksMeta.limit,
        page: this.booksMeta.page
      }),
      userBookResponse: this.userBookService.get({limit: 100, page: 0})
    }).subscribe({
      next: ({ bookResponse, userBookResponse }) => {
        const currentUserBooks = userBookResponse.data
          .filter((userBook) => userBook.data.user_id == this.loggedUser.id)
          .map((userBook) => {
            const formattedBook: IUserBook = { ...userBook.data };
            return formattedBook;
          });
        this.booksData = bookResponse.data.map((book) => new Book({ data: book }, currentUserBooks));
        this.booksDataSource.data = this.booksData;
        this.booksMeta.total = bookResponse.meta.total;
        this.booksMeta.pages = bookResponse.meta.pages;
        this.isLoadingBooks = false;
        this.isLoadingUserBooks = false;
      },
      error: (error) => { 
        console.log(error);
        this.isLoadingBooks = false;
        this.isLoadingUserBooks = false;
      }
    })
  }
}