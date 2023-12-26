interface IResponseCategories {
  data: ICategorie[];
  meta?: IMeta;
  error?: IError;
}

interface ICategorie {
  id: number;
  attributes: IAttributesCategorie;
}

interface IAttributesCategorie {
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  seo?: ISeo;
}
