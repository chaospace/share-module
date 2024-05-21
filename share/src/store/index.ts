//스토어 생성
import { StoreApi, createStore, useStore } from 'zustand';
import { type PokemonState, createPokemonState, createPokemonHooks } from './pokemonState';
import { type CountState, createCountState, createCountHooks } from './countState';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ShareModuleStore extends PokemonState, CountState { }

// 리액트 아닌 곳에서 접근을 위해 기본 store로 생성.
const store: StoreApi<ShareModuleStore> = createStore<ShareModuleStore>()(immer(devtools((...args) => ({
  ...createPokemonState(...args),
  ...createCountState(...args)
}))));

// 두 번째까지가 시그니처 마지막은 모든 것을 통합.
function useAppStore(): ShareModuleStore
function useAppStore<T>(selector: (state: ShareModuleStore) => T): T
function useAppStore<T>(selector?: (state: ShareModuleStore) => T) {
  return useStore(store, selector!);
}

// 상태 접근 훅 생성 
const pokemonHooks = createPokemonHooks(store);
const countHooks = createCountHooks(store);
export type { ShareModuleStore }
export {
  store,
  useAppStore,
  pokemonHooks,
  countHooks
};

