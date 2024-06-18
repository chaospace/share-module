// modal상태관리를 위한 스토어

import { StoreApi, createStore, useStore } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ModalStore {
  modalList: number[];
  active: number;
  regist(): number;
  remove(): void;
}

const BASE_DPETH = 1000;
const getNextHighstIndex = (source: unknown[]) => {
  return source.length + BASE_DPETH;
};

const modalStore: StoreApi<ModalStore> = createStore<ModalStore>()(
  devtools((set, get) => ({
    modalList: [],
    active: -1,
    regist() {
      const current = get().modalList;
      const active = getNextHighstIndex(current);
      set({ modalList: [...current, active], active }, undefined, { type: 'modal/regist' });
      return active;
    },
    remove() {
      const current = get().modalList;
      if (current.length) {
        current.pop();
      }
      set({ modalList: [...current], active: current[current.length - 1] }, undefined, {
        type: 'modal/remove'
      });
    }
  }))
);

function useModalStore(): ModalStore;
function useModalStore<T>(selector: (s: ModalStore) => T): T;
function useModalStore<T>(selector?: (s: ModalStore) => T) {
  return useStore(modalStore, selector!);
}

const useActiveIndex = () => {
  return useModalStore(s => s.active);
};

const useModalRegist = () => {
  return useModalStore(s => s.regist);
};

const useModalRemove = () => {
  return useModalStore(s => s.remove);
};

export { useActiveIndex, useModalRegist, useModalRemove };
export default useModalStore;
