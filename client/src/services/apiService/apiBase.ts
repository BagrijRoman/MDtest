import axios from "axios";
import get from "lodash/get";

import { apiEndpoints, httpStatus, requestMethods } from "../../const";
import { TokenService } from "./tokenService";

export type TApiBaseConstructorConfig = {
  apiBase: string;
  authCheckTimeout: number | undefined;
  logOutCb?: () => void;
};

type TSignInData = {
  accessToken: string;
  refreshToken: string;
  user: object;
};

type TRequestMethod = "get" | "post" | "put" | "patch" | "delete";

type TRequestParams = {
  url: string;
  method: TRequestMethod;
  body?: any;
  options?: any;
};

class ApiBase extends TokenService {
  constructor(config: TApiBaseConstructorConfig) {
    super();
    const { apiBase, authCheckTimeout, logOutCb } = config;
    this.authCheckTimeout = authCheckTimeout;
    this.api = axios.create({ baseURL: apiBase });
    this.logOutCb = logOutCb;
  }

  api;
  authCheckTimeout;
  logOutCb;

  _parseApiError(err: Error | any) {
    return {
      error: true,
      type: get(err, ["response", "data", "type"], null),
      data: get(err, ["response", "data", "data"], null),
      details: get(err, ["response", "data", "details"], null),
      status: get(err, ["response", "status"], null),
      unauthorized: get(null, ["response", "data", "status"], null) === httpStatus.UNAUTHORIZED,
    };
  }

  request = async ({ url, method, body = {}, options = {} }: TRequestParams) => {
    try {
      switch (method) {
        case requestMethods.GET:
        case requestMethods.DELETE:
          return await this.api[method](url, options);
        default:
          return await this.api[method](url, body, options);
      }
    } catch (err) {
      return this._parseApiError(err as Error);
    }
  };

  requestWithAuth = async ({
                             url,
                             method,
                             body = {},
                             options = {},
                           }: TRequestParams): Promise<any> => {
    try {
      const makeRequest = async () =>
        this.request({
          url,
          method,
          body,
          options: {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${this.getAccessToken()}`,
            },
          },
        });

      const isAccessTokenValid = this.checkAccessToken();
      const isRefreshTokenValid = this.checkRefreshToken();

      if (isAccessTokenValid) {
        return await makeRequest();
      } else if (!isRefreshTokenValid) {
        this.logOut();
        return { error: true };
      }

      const { status } = await this.refreshTokens();
      if (status === httpStatus.OK) {
        return await makeRequest();
      }
    } catch (err) {
      return this._parseApiError(err as Error);
    }
  };

  refreshTokens = async () => {
    const isRefreshTokenValid = this.checkRefreshToken();

    if (!isRefreshTokenValid) {
      this.logOut();
      return {};
    }

    const response = await this.request({
      method: requestMethods.POST,
      url: apiEndpoints.refreshToken,
      body: {
        refreshToken: this.getRefreshToken(),
      },
      options: {},
    });

    const { status, data } = response;

    if (status === httpStatus.OK) {
      this.processSignInData(data);
      return response;
    }

    this.logOut();
    return { error: true, data: null, status: null };
  };

  checkAuthOnStartup = async (): Promise<any> => {
    try {
      const isRefreshTokenValid = this.checkRefreshToken();

      if (isRefreshTokenValid) {
        const { status, data } = await this.refreshTokens();

        if (status === httpStatus.OK) {
          return { success: true, user: data?.user };
        }
      } else throw new Error();
    } catch (err) {
      this.logOut();
      return { error: true };
    }
  };

  processSignInData = (data: TSignInData) => {
    const { accessToken, refreshToken } = data;
    this.storeTokens({ accessToken, refreshToken });
  };

  login = async ({ email, password }: { email: string; password: string }): Promise<any> => {
    try {
      const { data, status } = await this.request({
        method: requestMethods.POST,
        url: apiEndpoints.login,
        body: { email, password },
        options: {},
      });

      this.processSignInData(data);

      return {
        success: status === httpStatus.OK,
        user: data.user,
        error: status !== httpStatus.OK,
        status,
      };
    } catch (err) {
      return this._parseApiError(err);
    }
  };

  logOut = () => {
    this.removeTokens();
    if (this.logOutCb) {
      this.logOutCb();
    }
  };
}

export { ApiBase };
