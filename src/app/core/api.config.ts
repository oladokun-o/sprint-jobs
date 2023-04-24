import { environment } from "src/environments/environment";
const host = environment.host;

export const API_CONFIG = {
  auth: {
    register: () => `${host}/auth/register`,
    login: () => `${host}/auth/login`,
    logout: () => `${host}/auth/logout`,
    list: (clientType: string) => `${host}/auth/${clientType}/users`,
    get: (clientType: string, id: number) => `${host}/auth/${clientType}/users/${id}`,
  }
};
