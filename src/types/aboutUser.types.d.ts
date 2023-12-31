import { ROLES } from "@/constants/app-keys.const";
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
  delivery_service: IResponseDeliveryService;
  branchNumber?: string;
  street?: string;
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

interface IAboutUserStore {
  contactInformation: IContactInformationForCreate;
  addressDelivery: IAddressDeliveryForCreate;
}

interface IResponseMyInformation {
  code: number;
  data: IMyInformation | null;
}
interface IMyInformation {
  id: number;
  username: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface IMyInformationFromCreate {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  additional_roles?: IAdditionalRoles[];
}

interface IAdditionalRoles {
  id: number;
  name: string;
  type: ROLES;
}
