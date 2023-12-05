interface IResponseAboutUser {
  data: IAboutUser[];
  code: number;
}

interface IResponseCreateAboutUser {
  data: IAboutUser | null;
  code: number;
}

interface IAboutUser {
  id: number;

  attributes: {
    createdAt: string;
    updatedAt: string;
    contactInformation: IContactInformation;
    addressDelivery: IAddressDelivery;
  };
}

interface IContactInformation {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

interface IAddressDelivery {
  id: number;
  city: string;
  idCity: string;
  postOffice: string;
  idPostOffice: string;
  delivery_service: IResponeDeliveryServices;
  branchNumber?: string;
  street?: string;
}

interface IResponseDeliveryServices {
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
  };
}

interface IAboutUserForCreate {
  data: {
    contactInformation: IContactInformationForCreate;
    addressDelivery: IAddressDeliveryForCreate;
  };
}

interface IContactInformationForCreate {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string | null;
}

interface IAddressDeliveryForCreate {
  city: string;
  idCity: string;
  postOffice: string;
  idPostOffice: string;
  delivery_service: number;
  branchNumber?: string;
  street?: string;
}
