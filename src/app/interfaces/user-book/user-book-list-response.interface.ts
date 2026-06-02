import IMetaResponse from '../general/meta-response.interface';
import IUserBook from './user-book.interface';

export default interface IUserBookListResponse {
  data: Array<{
    id: string;
    collection_id: string;
    project_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    data: IUserBook;
  }>;
  meta: IMetaResponse;
}
