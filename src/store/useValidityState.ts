import create from "zustand";

export interface RowValidity {
  rowId: number;
  validity: boolean;
}

interface ValidityState {
  validity: RowValidity[];
  setValidity: (newData: RowValidity[]) => void;
}

export const useValidityState = create<ValidityState>((set) => ({
  validity: [], 
  setValidity: (newData: RowValidity[]) => {
    set((state) => ({ validity: newData })); 
  },
}));
