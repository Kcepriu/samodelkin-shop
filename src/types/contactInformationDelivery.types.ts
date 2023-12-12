export interface IContactInformationDelivery {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  idCity: string;
  postOffice: string;
  idPostOffice: string;
  comment: string;
  deliveryServicesId: number;
}

export const emptyContactInformationDelivery = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  idCity: "",
  postOffice: "",
  idPostOffice: "",
  comment: "",
  deliveryServicesId: 0,
};
