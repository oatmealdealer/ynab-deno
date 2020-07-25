import { ApiAuth, YNAB_URL, Parameters } from "./index.ts";
export class YnabObject {
  base_url: string;
  auth: ApiAuth;

  constructor(route: string, auth: ApiAuth) {
    this.base_url = `${YNAB_URL}${route}`;
    this.auth = auth;
  }

  async get(route: string, params: Parameters = {}) {
    let urlObject = new URL(`${this.base_url}${route}`);
    for (const prop in params) {
      urlObject.searchParams.append(prop, params[prop]);
    }
    return fetch(urlObject.toString(), {
      method: "GET",
      ...this.auth,
    }).then((res) =>
      res.json().then((res) => {
        return res.data;
      })
    );
  }

  async list() {
    return this.get("");
  }

  async find(id: number) {
    return this.get(`/${id}`);
  }
}
