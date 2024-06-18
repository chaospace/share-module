// modal상태관리를 위한 스토어

import { StoreApi, createStore, useStore } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ModalStore {
  modalList: number[];
  active: number;
  regist(depthIndex: number): () => void;
  nextHighestIndex: () => number;
}

const BASE_DPETH = 1000;
const getNextHighestIndex = (source: unknown[]) => {
  return source.length + BASE_DPETH;
};

const modalStore: StoreApi<ModalStore> = createStore<ModalStore>()(
  devtools((set, get) => ({
    modalList: [],
    active: -1,
    nextHighestIndex() {
      return getNextHighestIndex(get().modalList);
    },
    regist(depthIndex: number) {
      const current = get().modalList;
      const active = depthIndex;
      set({ modalList: [...current, active], active }, undefined, { type: 'modal/regist' });
      return () => {
        set({ modalList: [...current], active: current[current.length - 1] }, undefined, {
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

const useModalRegist = () => {
  return useModalStore(s => s.regist);
};

const useNextHigtestIndex = () => {
  return useModalStore(s => s.nextHighestIndex);
};

export { useActiveIndex, useModalRegist, useNextHigtestIndex };
export default useModalStore;
