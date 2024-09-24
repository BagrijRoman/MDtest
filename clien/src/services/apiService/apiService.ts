import { apiEndpoints, requestMethods } from "../../const";
import { ApiBase, TApiBaseConstructorConfig } from "./apiBase";

class ApiService extends ApiBase {
  constructor(config: TApiBaseConstructorConfig) {
    super(config);
  }

  apiTest = async () => this.request({
    url: apiEndpoints.test,
    method: requestMethods.GET,
  });

  getAllUsers = async () => this.requestWithAuth({
    url: apiEndpoints.getAllUsers,
    method: requestMethods.GET,
  });

  getUser = async (userId: string) => this.requestWithAuth({
    url: `${ apiEndpoints.getUser }${ userId }`,
    method: requestMethods.GET,
  });

  getCountriesList = async () => this.requestWithAuth({
    url: apiEndpoints.countries,
    method: requestMethods.GET,
  });

  getCurrentUserProfile = async () => this.requestWithAuth({
    url: apiEndpoints.userProfile,
    method: requestMethods.GET,
  })

  updateCurrentUserProfile = async (data: {
    countryId?: string,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    address?: string,
    extraInfo?: string,
  }) => this.requestWithAuth({
    url: apiEndpoints.userProfile,
    method: requestMethods.PATCH,
    body: data,
  })
}

export { ApiService };
