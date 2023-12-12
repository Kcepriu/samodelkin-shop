class HttpApiNovaPoshta {
  private apiKey: string = "";
  private limitPage: string = "";
  private url: string = "https://api.novaposhta.ua/v2.0/json/";

  constructor() {
    this.apiKey = process.env.NP_API_KEY || "";
    this.limitPage = "16";
  }

  getRequestSearchCity(nameCity: string, page: number = 1) {
    return {
      apiKey: this.apiKey,
      modelName: "Address",
      calledMethod: "searchSettlements",
      methodProperties: {
        CityName: nameCity,
        Limit: this.limitPage,
        Page: page,
      },
    };
  }

  getRequestSearchWarehouse({
    cityRef,
    searchText,
    typeOfWarehouseRef = "",
    page = 1,
  }: {
    cityRef: string;
    searchText: string;
    typeOfWarehouseRef?: string;
    page?: number;
  }) {
    return {
      apiKey: this.apiKey,
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityRef: cityRef,
        Page: page,
        Limit: this.limitPage,
        Language: "UA",
        TypeOfWarehouseRef: typeOfWarehouseRef,
        FindByString: searchText,
      },
    };
  }

  async searchCity(nameCity: string): Promise<IResponseSearchCityNP | null> {
    const body = this.getRequestSearchCity(nameCity);

    try {
      const res = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        return null;
      }

      return res.json();
    } catch {
      return null;
    }
  }

  async searchWarehouses(
    idCity: string,
    nameWarehouses: string
  ): Promise<IResponseSearchWarehouseNP | null> {
    const body = this.getRequestSearchWarehouse({
      cityRef: idCity,
      searchText: nameWarehouses,
    });

    try {
      const res = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        return null;
      }

      return res.json();
    } catch {
      return null;
    }
  }
}

const httpApiNovaPoshta = new HttpApiNovaPoshta();

export default httpApiNovaPoshta;
