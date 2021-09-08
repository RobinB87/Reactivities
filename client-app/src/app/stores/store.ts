import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store {
  commonStore: CommonStore;
  activityStore: ActivityStore;
  userStore: UserStore;
  modalStore: ModalStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  activityStore: new ActivityStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
