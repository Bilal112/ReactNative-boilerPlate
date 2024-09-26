import { StateCreator } from "zustand";

interface UserState {
  image: string;
  data: any;
  name: string;
}
export interface User {
  userInfo: object;
  updateUserInfo: (userInfo: object) => void;
  loading: boolean;
  listOfUser: Array<UserState>;
  updateListOfUser: (data: object) => void;
  count: number;
  paidAccount:Boolean
  setCount: () => void;
  allowUserToSwipe:()=>void
}
export const AuthConstructor: StateCreator<User> = (set, get) => ({
  userInfo: {},
  loading: false,
  updateUserInfo: (userInfoData) => set({ userInfo: userInfoData }),
  allowUserToSwipe:()=>set({paidAccount:true}),
  listOfUser: [],
  paidAccount:false,
  count: 0,
  setCount: () => {  set({ count: get().count + 1 })},
  updateListOfUser: (data: any) => set({ listOfUser: data }),
});
