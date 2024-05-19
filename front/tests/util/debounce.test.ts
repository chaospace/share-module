/**
 * debouce동작 테스트
 */

import { debounce } from "@/components/util";
import exp from "constants";

beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
})

afterAll(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
});



it("debounce를 이용한 함수 지연처리", () => {
    const foo = jest.fn();
    const debounceFoo = debounce(foo, 100);
    debounceFoo();
    debounceFoo();
    debounceFoo();
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledTimes(3);
    expect(foo).toHaveBeenCalledTimes(1);
});