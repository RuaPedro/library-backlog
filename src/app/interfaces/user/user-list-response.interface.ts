import IMetaResponse from '../general/meta-response.interface';
import IUser from './user.interface';

export default interface IUserListResponse {
  data: Array<{
    id: string;
    collection_id: string;
    project_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    data: IUser;
  }>;
  meta: IMetaResponse;
}
