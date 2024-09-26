import { create } from "zustand";
import {
  devtools,
  persist,
  createJSONStorage,
  StateStorage,
} from "zustand/middleware";
import { get, set, del } from "idb-keyval"; // can use anything: IndexedDB, Ionic Storage, etc.
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthConstructor, User } from "./userDetailSlicer/userSlicer";
const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

export const useBearStore = create<User>()(
  devtools(
    persist(
      (...a) => ({
        ...AuthConstructor(...a),
      }),
      {
        name: "bearStore",
        storage: createJSONStorage(() => AsyncStorage),
        
      }
    )
  )
);
