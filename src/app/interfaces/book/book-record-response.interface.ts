import IBook from './book.interface';

export default interface IBookRecordResponse {
  data: {
    id: string;
    collection_id: string;
    project_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    data: IBook;
  };
}
