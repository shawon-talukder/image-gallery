import { create } from "zustand";

interface Store {
  checkedImg: string[];
  updateCheckedImg: (img: string) => void;
  removeCheckedImg: (img: string) => void;
}
const useStore = create<Store>((set) => ({
  checkedImg: [],
  updateCheckedImg: (img: string) => {
    set((state) => ({ checkedImg: [...state.checkedImg, img] }));
  },
  removeCheckedImg: (img: string) => {
    set((state) => ({ checkedImg: state.checkedImg.filter((i) => i !== img) }));
  },
}));

export default useStore;
