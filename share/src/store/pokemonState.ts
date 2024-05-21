import { useStore } from 'zustand';
import type { PropsSelector, State, StateCreatorEnhancer, StateHookCreator } from './types';
import { getNextState } from './common';

const ACTION = { SET_SELECT: 'SET_SELECT', SET_POKEMONS: 'SET_POKEMONS' }

interface IPokemon { id: number; name: string; sprite: string; }

type SelectPokemon = IPokemon | undefined;

interface PokemonProps {
    pokemons: IPokemon[],
    select: SelectPokemon,
}

type PokemonState = State<PokemonProps>;
type PokemonSelector = PropsSelector<PokemonState>;

// set은 타입에 따른 처리가 필요하다..
const createPokemonState: StateCreatorEnhancer<PokemonState> = (set, get) => ({
    pokemons: [],
    select: undefined,
    setPokemons: (nextState) => set({ pokemons: getNextState(nextState, get().pokemons) }, undefined, { type: ACTION.SET_POKEMONS }),
    setSelect: (nextState) => set({ select: getNextState(nextState, get().select) }, undefined, { type: ACTION.SET_SELECT })
});


// selector
const pokemonSelector: PokemonSelector = {
    pokemonsSelector: (state) => state.pokemons,
    selectSelector: (state) => state.select,
    setPokemonsSelector: (state) => state.setPokemons,
    setSelectSelector: (state) => state.setSelect,
}

// curring을 이용한 훅 사용.
const createPokemonHooks: StateHookCreator<PokemonState> = (store) => {
    return {
        usePokemons: () => useStore(store, pokemonSelector.pokemonsSelector),
        useSetPokemons: () => useStore(store, pokemonSelector.setPokemonsSelector),
        useSelect: () => useStore(store, pokemonSelector.selectSelector),
        useSetSelect: () => useStore(store, pokemonSelector.setSelectSelector)
    }
}

export type {
    IPokemon,
    PokemonProps,
    PokemonState
}

export {
    createPokemonState,
    createPokemonHooks
}