import { decode } from "jsonwebtoken";
import flowRight from "lodash/flowRight";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../const";

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

interface ITokenPayload {
  exp: number;
}

class TokenService {
  storeTokens = ({ accessToken, refreshToken }: ITokens) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  };

  removeTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  };

  _checkToken = (token: string | null): boolean => {
    if (token) {
      const decoded = decode(token) as ITokenPayload;
      const expirationTimestamp = (decoded && decoded?.exp) || 0;

      return expirationTimestamp - 5 > Date.now() / 1000;
    }
    return false;
  };

  getAccessToken = (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY);

  getRefreshToken = (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY);

  checkAccessToken = (): boolean => flowRight(this._checkToken, this.getAccessToken)();

  checkRefreshToken = (): boolean => flowRight(this._checkToken, this.getRefreshToken)();
}

export { TokenService };
