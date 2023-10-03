interface IResponseColor {
  data: IColor[];
  meta?: IMeta;
  error?: IError;
}

interface IColor {
  id: number;
  attributes: IAttributesColor;
}

interface IAttributesColor {
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}
