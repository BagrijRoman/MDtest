import { ApiService as Api } from "./apiService";

const ApiService = new Api({
  apiBase: process.env.API_BASE as string,
  authCheckTimeout: Number(process.env.AUTH_CHECK_TIMEOUT) as number,
  logOutCb: () => {},
});

export { ApiService };
