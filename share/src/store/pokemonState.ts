import { StateCreator, StoreApi, createStore, useStore } from "zustand";
import { PropsSelector, State, StateHookCreator, StateHooks, StateSetSelector } from "./types";

interface IPokemon {
    id: number;
    name: string;
    sprite: string;
}

type SelectPokemon = IPokemon | undefined;

interface PokemonProps {
    pokemons: IPokemon[],
    select: SelectPokemon,
}

type PokemonState = State<PokemonProps>;
type PokemonSelector = PropsSelector<PokemonState>;
type PokemonHooks = StateHooks<PokemonState>;

// store
const pokemonStore = createStore<PokemonState>((set) => ({
    pokemons: [],
    select: undefined,
    setPokemons: (pokemons) => set({ pokemons }),
    setSelect: (select) => set({ select })
}));


const createPokemonState: StateCreator<PokemonState> = set => ({
    pokemons: [],
    select: undefined,
    setPokemons: (pokemons) => set({ pokemons }),
    setSelect: (select) => set({ select })
});

// store를 받아서 하고 코드에는 slice를 넣어둔다.

// selector
const pokemonSelector: PokemonSelector = {
    pokemonsSelector: (state) => state.pokemons,
    selectSelector: (state) => state.select,
    setPokemonsSelector: (state) => state.setPokemons,
    setSelectSelector: (state) => state.setSelect,
}

// hooks
const pokemonHooks: PokemonHooks = {
    usePokemons() {
        return useStore(pokemonStore, pokemonSelector.pokemonsSelector);
    },
    useSetPokemons() {
        return useStore(pokemonStore, pokemonSelector.setPokemonsSelector);
    },
    useSelect() {
        return useStore(pokemonStore, pokemonSelector.selectSelector);
    },
    useSetSelect() {
        return useStore(pokemonStore, pokemonSelector.setSelectSelector);
    }
}

// curring을 이용한 훅 사용.
const createHooks: StateHookCreator<StoreApi<PokemonState>, PokemonState> = (store: StoreApi<PokemonState>) => {
    return {
        usePokemons() {
            return useStore(store, pokemonSelector.pokemonsSelector);
        },
        useSetPokemons() {
            return useStore(store, pokemonSelector.setPokemonsSelector);
        },
        useSelect() {
            return useStore(store, pokemonSelector.selectSelector);
        },
        useSetSelect() {
            return useStore(store, pokemonSelector.setSelectSelector);
        }
    }
}


export type {
    IPokemon,
    PokemonState
}

export {
    createPokemonState,
    pokemonStore,
    pokemonSelector,
    pokemonHooks,
    createHooks
}