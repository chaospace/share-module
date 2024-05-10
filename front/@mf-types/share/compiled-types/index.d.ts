import { StoreApi } from "zustand";
import { type PokemonState } from "./pokemonState";
import { type CountState } from "./countState";
interface ShareModuleStore extends PokemonState, CountState {
}
declare const store: StoreApi<ShareModuleStore>;
declare function useAppStore(): ShareModuleStore;
declare function useAppStore<T>(selector: (state: ShareModuleStore) => T): T;
declare const pokemonHooks: import("./types").StateHooks<PokemonState, keyof import("./pokemonState").PokemonProps | "setPokemons" | "setSelect">;
declare const countHooks: import("./types").StateHooks<CountState, "count" | "setCount">;
export type { ShareModuleStore };
export { store, useAppStore, pokemonHooks, countHooks };
