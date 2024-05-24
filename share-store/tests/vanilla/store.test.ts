import { ShareModuleStore, store as appStore } from '@/store';
import { StoreApi } from 'zustand';

let store: StoreApi<ShareModuleStore> = appStore;
// 항상 스토어 초기화
beforeEach(() => {
  store.setState(store.getInitialState(), true);
});

it('store는 count, pokmeon상태 모두를 가지고 있다.', () => {
  expect(store.getState()).toHaveProperty('count');
  expect(store.getState()).toHaveProperty('pokemons');
});

describe('store는 테스트 시 항상 초기값을 가지고 있다..', () => {
  it('count를 2로 변경 후 확인 ', () => {
    store.setState({ count: 2 });
    expect(store.getState().count).toEqual(2);
  });

  it('다음 테스트 시 이전 변경 count값 초기화 확인 ', () => {
    expect(store.getState().count).toEqual(0);
  });
});
