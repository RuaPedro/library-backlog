import IBookAuthor from '../interfaces/book/book-author.interface';
import IBookCover from '../interfaces/book/book-cover.interface';
import IUserBook from '../interfaces/user-book/user-book.interface';
import IBookRecordResponse from '../interfaces/book/book-record-response.interface';

export default class Book {
  public id: string = '';
  public key: string = '';
  public cover: IBookCover = {
    id: '',
    urls: {
      large: '',
      small: '',
      medium: '',
    },
  };
  public pages: number = 0;
  public title: string = '';
  public authors: IBookAuthor[] = [];
  public language: string = '';
  public subjects: Array<string> = [];
  public created_at: string = '';
  public updated_at: string = '';
  public description: string = '';
  public publish_year: string = '';
  public isInTheBacklog: boolean = false;
  public userBook: null | IUserBook = null;

  constructor(bookParams?: IBookRecordResponse, userBooks?: IUserBook[]) {
    if (!bookParams || !userBooks) return;

    this.id = bookParams.data.id;
    this.key = bookParams.data.data.key;
    this.cover = bookParams.data.data.cover;
    this.pages = bookParams.data.data.pages;
    this.title = bookParams.data.data.title;
    this.authors = bookParams.data.data.authors;
    this.language = bookParams.data.data.language;
    this.subjects = bookParams.data.data.subjects;
    this.created_at = bookParams.data.created_at;
    this.updated_at = bookParams.data.updated_at;
    this.description = bookParams.data.data.description;
    this.publish_year = bookParams.data.data.publish_year;

    this.isInTheBacklog = userBooks.some((book) => book.book_id == this.id);
    if (this.isInTheBacklog) {
      this.userBook = userBooks.find((book) => book.book_id == this.id) || null;
    }
  }
}
