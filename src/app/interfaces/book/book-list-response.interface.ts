import IMetaResponse from '../general/meta-response.interface';
import IBook from './book.interface';

export default interface IBookListResponse {
  data: Array<{
    id: string;
    collection_id: string;
    project_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    data: IBook;
  }>;
  meta: IMetaResponse;
}
