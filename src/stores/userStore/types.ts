export type UserStoreData = {
  username: string;
  role: string;
  token: string;
} | null;

export type UserStore = {
  user: UserStoreData;
  actions: {
    setUser: (data: UserStoreData) => void;
    clear: () => void;
  };
};
