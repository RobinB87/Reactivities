import { makeAutoObservable } from "mobx";
import agent from "../api/agents";
import { User, UserFormValues } from "../models/user";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get IsLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      console.log(user);
    } catch (e) {
      throw e;
    }
  };
}
