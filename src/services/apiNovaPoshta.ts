class ApiNovaPoshta {
  private KEY = "80f637d2cd85fe5494b0e0ad49ec908e";

  public getRequestSearchCity = (nameCity: string) => {
    return {
      apiKey: this.KEY,
      modelName: "Address",
      calledMethod: "searchSettlements",
      methodProperties: {
        CityName: nameCity,
        Limit: "10",
        Page: "1",
      },
    };
  };
}

const apiNovaPoshta = new ApiNovaPoshta();

export default apiNovaPoshta;
