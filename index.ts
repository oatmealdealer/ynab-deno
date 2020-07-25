import { config } from "https://deno.land/x/dotenv/mod.ts";
import { YnabObject } from "./YnabObject.ts";

export const YNAB_URL = "https://api.youneedabudget.com/v1/";

export interface ApiAuth {
  headers: { "Authorization": string };
}

function get_auth(token: string) {
  const auth: ApiAuth = {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  };
  return auth;
}

const auth = get_auth(config().YNAB_TOKEN);

export interface Parameters {
  [key: string]: string;
}

class Budget extends YnabObject {
  constructor(auth: ApiAuth) {
    super("budgets", auth);
  }
}

class YnabAPI {
  auth: ApiAuth;
  constructor(token: string) {
    this.auth = get_auth(token);
  }
}

const budget = new Budget(auth);
// define the interface for a request object

let budgets = budget.list();

console.log("Currently waiting for budgets to be listed...");

let response = await budgets;
console.log("Budgets have been listed!");

// let json_resp = await response.json();

console.log(response);
let first_budget = budget.find(response.budgets[0].id);
console.log("Waiting for the first budget to be retrieved!");
let resp = await first_budget;
console.log("Found the first budget!");
console.log(resp);
