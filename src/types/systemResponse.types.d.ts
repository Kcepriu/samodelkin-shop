interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
interface IMeta {
  pagination: IPagination;
}

interface IError {
  status: number;
  name: string;
  message: string;
  // details: Details;
}

interface IResposeError {
  data: null;
  error: IError;
}

interface ISearchParams {
  [key: string]: string;
}
