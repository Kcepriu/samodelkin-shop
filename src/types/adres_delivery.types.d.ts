interface IAddressDelivery {
  id: number;
  city: string;
  branchNumber: string;
  street: string;
  delivery_service: {
    data: {
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
    };
  };
}

interface IAddressDeliveryForCreate {
  city: string;
  branchNumber: string;
  street: string;
  delivery_service: number;
}
