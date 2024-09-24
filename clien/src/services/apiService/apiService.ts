import { apiEndpoints, requestMethods } from "../../const";
import { ApiBase, TApiBaseConstructorConfig } from "./apiBase";

class ApiService extends ApiBase {
  constructor(config: TApiBaseConstructorConfig) {
    super(config);
  }

  // api request methods will be here

  apiTest = async () => this.request({
    url: apiEndpoints.test,
    method: requestMethods.GET,
  });

  getAllUsers = async () => this.request({
    url: apiEndpoints.getAllUsers,
    method: requestMethods.GET,
  });

  getUser = async (userId: string) => this.request({
    url: `${apiEndpoints.getUser}${userId}`,
    method: requestMethods.GET,
  });
}

export { ApiService };
