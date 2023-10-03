interface IAdresDeliveryForCreate {
  cyty: string;
  branchNumber: string;
  street: string;
  delivery_service: number;
}

interface IAdresDelivery {
  id: number;
  cyty: string;
  branchNumber: string;
  street: string;
  delivery_service: IDataDeliveryService;
}

interface IDataDeliveryService {
  data: IDeliveryService;
}

interface IDeliveryService {
  id: number;
  attributes: IAttributesDeliveryService;
}

interface IAttributesDeliveryService {
  title: string;
  slug: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  homeDelivery: boolean;
  postOfficeDelivery: boolean;
}
