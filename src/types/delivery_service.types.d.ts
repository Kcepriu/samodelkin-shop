interface IResponseDeliveryStatus {
  data: IDeliveryStatus[];
  meta?: IMeta;
  error?: IError;
}

interface IDeliveryStatus {
  id: number;
  attributes: IAttributesDeliveryStatus;
}

interface IAttributesDeliveryStatus {
  title: string;
  slug: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  homeDelivery: boolean;
  postOfficeDelivery: boolean;
}
