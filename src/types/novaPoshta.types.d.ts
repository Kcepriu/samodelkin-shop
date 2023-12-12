interface IResponseNP {
  success: boolean;
  errors: any[];
  warnings: any[];
  info: any[];
  messageCodes: any[];
  errorCodes: any[];
  warningCodes: any[];
  infoCodes: any[];
}

interface IResponseSearchCityNP extends IResponseNP {
  data: {
    TotalCount: number;
    Addresses: IAddressCityNP[];
  }[];
}

interface IAddressCityNP {
  Present: string;
  Warehouses: number;
  MainDescription: string;
  Area: string;
  Region: string;
  SettlementTypeCode: string;
  Ref: string;
  DeliveryCity: string;
  AddressDeliveryAllowed: boolean;
  StreetsAvailability: boolean;
  ParentRegionTypes: string;
  ParentRegionCode: string;
  RegionTypes: string;
  RegionTypesCode: string;
}

interface IResponseSearchWarehouseNP extends IResponseNP {
  data: IWarehouseNP[];
}

interface IWarehouseNP {
  SiteKey: string;
  Description: string;
  DescriptionRu: string;
  ShortAddress: string;
  ShortAddressRu: string;
  Phone: string;
  TypeOfWarehouse: string;
  Ref: string;
  Number: string;
  CityRef: string;
  CityDescription: string;
  CityDescriptionRu: string;
  SettlementRef: string;
  SettlementDescription: string;
  SettlementAreaDescription: string;
  SettlementRegionsDescription: string;
  SettlementTypeDescription: string;
  SettlementTypeDescriptionRu: string;
  Longitude: string;
  Latitude: string;
  PostFinance: string;
  BicycleParking: string;
  PaymentAccess: string;
  POSTerminal: string;
  InternationalShipping: string;
  SelfServiceWorkplacesCount: string;
  TotalMaxWeightAllowed: string;
  PlaceMaxWeightAllowed: string;
  SendingLimitationsOnDimensions: IPackageDimensions;
  ReceivingLimitationsOnDimensions: IPackageDimensions;
  Reception: IScheduleNP;
  Delivery: IScheduleNP;
  Schedule: IScheduleNP;
  DistrictCode: string;
  WarehouseStatus: string;
  WarehouseStatusDate: string;
  WarehouseIllusha: string;
  CategoryOfWarehouse: string;
  Direct: string;
  RegionCity: string;
  WarehouseForAgent: string;
  GeneratorEnabled: string;
  MaxDeclaredCost: string;
  WorkInMobileAwis: string;
  DenyToSelect: string;
  CanGetMoneyTransfer: string;
  HasMirror: string;
  HasFittingRoom: string;
  OnlyReceivingParcel: string;
  PostMachineType: string;
  PostalCodeUA: string;
  WarehouseIndex: string;
  BeaconCode: string;
  PostomatFor: string;
}

interface IPackageDimensions {
  Width: number;
  Height: number;
  Length: number;
}

interface IScheduleNP {
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
}
