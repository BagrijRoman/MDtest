import { ApiService as Api } from "./apiService";

const ApiService = new Api({
  apiBase: "http://localhost:4000",
  authCheckTimeout: 10000,
  logOutCb: () => {},
});

export { ApiService };
