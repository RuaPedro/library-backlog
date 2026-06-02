import IBook from '../book/book.interface';
export default interface IUserBook {
  id?: string;
  book: IBook;
  notes: string;
  rating: number;
  status: number;
  book_id: string;
  user_id: string;
  started_at: string;
  finished_at: string;
}
