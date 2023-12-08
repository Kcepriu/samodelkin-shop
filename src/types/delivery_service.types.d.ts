interface IResponseDeliveryServices {
  data: IDeliveryServices[];
  meta?: IMeta;
  error?: IError;
}

interface IResponseDeliveryService {
  data: IDeliveryServices;
}

interface IDeliveryServices {
  id: number;
  attributes: {
    title: string;
    slug: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    homeDelivery: boolean;
    postOfficeDelivery: boolean;
    logo: { data: IImage };
  };
}
