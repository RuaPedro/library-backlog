import ILoginResponseMeta from './login-response-meta.interface';

export default interface ILoginResponse {
  token: string;
  _meta: ILoginResponseMeta;
}
