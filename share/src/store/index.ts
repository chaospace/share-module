//스토어 생성
import { createStore, useStore } from "zustand";
import { type PokemonState, createPokemonState, createPokemonHooks } from "./pokemonState";
import { type CountState, createCountState, createCountHooks } from "./countState";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface ShareModuleStore extends PokemonState, CountState { }

// 리액트 아닌 곳에서 접근을 위해 기본 store로 생성.
const appStore = createStore<ShareModuleStore>()(immer(devtools((...args) => ({
  ...createPokemonState(...args),
  ...createCountState(...args)
}))));


function useAppStore(): ShareModuleStore
function useAppStore<T>(selector: (state: ShareModuleStore) => T): T
function useAppStore<T>(selector?: (state: ShareModuleStore) => T) {
  return useStore(appStore, selector!);
}

// 상태 접근 훅 생성 
const pokemonHooks = createPokemonHooks(appStore);
const countHooks = createCountHooks(appStore);
export type { ShareModuleStore }
export {
  appStore,
  useAppStore,
  pokemonHooks,
  countHooks
};

