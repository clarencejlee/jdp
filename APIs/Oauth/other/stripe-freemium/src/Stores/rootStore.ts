import { types } from "mobx-state-tree";

const RootStore = types
  .model({
    subscribed: types.boolean,
  })
  .actions((self) => ({
    subscribe(didSubscribe: boolean) {
      self.subscribed = didSubscribe;
    },
  }));

const store = RootStore.create({
  subscribed: false,
});

export const useStore = () => store;
