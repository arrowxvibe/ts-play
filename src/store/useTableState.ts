import { useEffect } from "react";
import { create } from "zustand";
import { getData, saveData } from "../utils/indexeddb";

interface TableState<T> {
  key: string | null;
  setKey: (key: string) => void;
  data: T[];
  setData: (newData: T[]) => void;
}

export const useTableStore = create<TableState<any>>((set) => {
  return {
    data: [],
    key: null,
    setKey: (newKey: string) => set((state) => ({ ...state, key: newKey })),
    setData: (newData: any[]) =>
      set((state) => {
        if (state.key) {
          saveData(state.key, newData);
        }
        return { ...state, data: newData };
      }),
  };
});

export const useTableState = (key: string) => {
  const { data, setData, setKey } = useTableStore();

  useEffect(() => {
    setKey(key);
    getData(key).then((cachedData) => setData(cachedData));
  }, [key]); 

  return { data, setData };
};
