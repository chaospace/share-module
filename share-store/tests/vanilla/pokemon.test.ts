// 스토어 사용 테스트

import { StoreApi, createStore } from 'zustand';
import type { PokemonState } from '@/store/pokemonState';
import { createPokemonState } from '@/store/pokemonState';

const getPokemons = async () => {
  const respone = await fetch('http://api.example.com/pokemons');
  const json = await respone.json();
  return json;
};

let store: StoreApi<PokemonState>;
// 스토어 초기화
beforeEach(() => {
  store = createStore<PokemonState>(createPokemonState);
});

describe.skip('pokemonState 기본 테스트', () => {
  it('select 초기값은 undefined', () => {
    expect(store.getState().select).toEqual(undefined);
  });

  it('api.example.com/pokemons api는 pokemons목록을 제공한다', async () => {
    const json = await getPokemons();
    expect(Array.isArray(json)).toBe(true);
  });

  it('setPokemons로 pokemons상태를 변경한다.', async () => {
    //설정 전 pokemons는 빈 배열이다.
    expect(store.getState().pokemons).toEqual([]);
    const pokemons = await getPokemons();
    store.getState().setPokemons(pokemons);
    expect(store.getState().pokemons).toEqual(pokemons);
  });

  it('api.example.com/pokemon post요청으로 pokemon을 추가할 수 있다.', async () => {
    //설정 전 pokemons는 빈 배열이다.
    expect(store.getState().pokemons).toEqual([]);
    const pokemons = await getPokemons();
    store.getState().setPokemons(pokemons);
    expect(store.getState().pokemons).toEqual(pokemons);
  });
});

describe('pokemon 등록 테스트(example.com/pokemons)', () => {
  it('등록 후 응답은 요청 pokemon과 동일하다.', async () => {
    const reqPokemon = {
      name: 'my-append-pokemons',
      sprite: 'append-sprite'
    };
    const response = await fetch('http://api.example.com/pokemons', {
      method: 'POST',
      body: JSON.stringify(reqPokemon)
    });
    const resPokemon = await response.json();
    expect(resPokemon.name).toEqual(reqPokemon.name);
  });
});
