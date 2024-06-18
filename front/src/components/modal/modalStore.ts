// modal상태관리를 위한 스토어

import { StoreApi, createStore, useStore } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ModalStore {
  modalCount: number;
  active?: number;
  regist(depthIndex: number): () => void;
  nextHighestIndex: () => number;
}

const BASE_DPETH = 1000;
const getNextHighestIndex = (count: number) => {
  return BASE_DPETH + count;
};

const modalStore: StoreApi<ModalStore> = createStore<ModalStore>()(
  devtools((set, get) => ({
    modalCount: 0,
    active: undefined,
    nextHighestIndex() {
      return getNextHighestIndex(get().modalCount);
    },
    regist(depthIndex: number) {
      const current = get().modalCount;
      const active = depthIndex;
      set({ modalCount: current + 1, active }, undefined, { type: 'modal/regist' });
      return () => {
        set({ modalCount: current, active: active - 1 }, undefined, {
          type: 'modal/remove'
        });
      };
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

export { useActiveIndex };
export default useModalStore;
