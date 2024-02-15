interface IResponseFilter {
  data: IFilter[];
  meta?: IMeta;
  error?: IError;
}

interface IFilter {
  id: string;
  attributes: {
    title: string;
    icon: string;
    sort: number;
    value: string[];
    count: number[];
  };
}
