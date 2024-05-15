import "@testing-library/dom";
import "@testing-library/jest-dom";
import "@testing-library/react";
import { cleanup } from "@testing-library/react";

//시작 전 한번
beforeAll(() => { });

//매 테스트 이후 매번 
afterEach(() => {
    cleanup();
});
// 모두 끝나고 한번
afterAll(() => { })