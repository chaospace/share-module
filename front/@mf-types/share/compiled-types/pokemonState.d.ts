import type { State, StateCreatorEnhancer, StateHookCreator } from "./types";
interface IPokemon {
    id: number;
    name: string;
    sprite: string;
}
type SelectPokemon = IPokemon | undefined;
interface PokemonProps {
    pokemons: IPokemon[];
    select: SelectPokemon;
}
type PokemonState = State<PokemonProps>;
declare const createPokemonState: StateCreatorEnhancer<PokemonState>;
declare const createPokemonHooks: StateHookCreator<PokemonState>;
export type { IPokemon, PokemonProps, PokemonState };
export { createPokemonState, createPokemonHooks };
