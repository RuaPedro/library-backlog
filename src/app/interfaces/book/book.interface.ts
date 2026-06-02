import IBookCover from './book-cover.interface';
import IBookAuthor from './book-author.interface';

export default interface IBook {
  id?: string;
  key: string;
  cover: IBookCover;
  pages: number;
  title: string;
  authors: IBookAuthor[];
  language: string;
  subjects: Array<string>;
  description: string;
  publish_year: string;
}
