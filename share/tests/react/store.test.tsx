/**
 * @jest-environment jsdom
 */

// 리액트 환경 동작 테스트
import { countHooks } from "@/store";
import { fireEvent, getByRole, getByTestId, render } from "@testing-library/react";
import { before } from "node:test";
import React, { useEffect, useRef } from "react";


const useRenderCount = () => {
    const renderRef = useRef(0);
    return renderRef;
}

const UserCounter = () => {
    const { useCount } = countHooks;
    const count = useCount();

    return (
        <span data-testid="counter">{ count }</span>
    )
}

const FooApp = (props: any) => {
    const { useSetCount, useCount } = countHooks;

    const setCount = useSetCount();
    const count = useCount();
    const renderCount = useRenderCount();
    renderCount.current += 1;
    return (
        <main { ...props }>
            <span data-testid="perf">{ renderCount.current }</span>
            <button onClick={ () => setCount(count + 1) }>increment</button>
            <UserCounter />
        </main>
    )
}

const FooAppAdvance = (props: any) => {
    const { useSetCount } = countHooks;
    const setCount = useSetCount();
    const renderCount = useRenderCount();
    renderCount.current += 1;
    return (
        <main { ...props }>
            <span data-testid="perf">{ renderCount.current }</span>
            <button onClick={ () => setCount(prev => prev + 1) }>ad-increment</button>
            <UserCounter />
        </main>
    )
}


describe.skip("zustand 리액트 환경 동작 테스트", () => {
    it.skip("render를 통한 돔 초기화", async () => {
        const { findByRole } = render(<FooApp />);
        const element = await findByRole("main");
        expect(element).toBeInTheDocument();
    });

    it("메인 클릭 시 count 1 증가", async () => {
        const { findByRole, findByTestId } = render(<FooApp />);
        const element = await findByRole("button");
        const counter = await findByTestId("counter");
        // click이벤트 발생.
        fireEvent.click(element);
        expect(counter).toHaveTextContent("1");
    });
});


const renderTestComp = async () => {
    const { findByTestId, unmount } = render(
        <>
            <FooApp data-testid="foo" />
            <FooAppAdvance data-testid="adfoo" />
        </>
    )

    const foo = await findByTestId("foo");
    const adFoo = await findByTestId("adfoo");

    const fooButton = getByRole(foo, "button");
    const fooRenderCount = getByTestId(foo, "perf");
    const fooCounter = getByTestId(foo, "counter");

    const adFooButton = getByRole(adFoo, "button");
    const adFooRenderCount = getByTestId(adFoo, "perf");
    const adFooCounter = getByTestId(adFoo, "counter");

    const fooClick = () => fireEvent.click(fooButton);
    const fooCounterValue = () => fooCounter.textContent;
    const fooRenderValue = () => fooRenderCount.textContent;

    const adFooClick = () => fireEvent.click(adFooButton);
    const adFooRenderValue = () => adFooRenderCount.textContent;
    const adFooCounterValue = () => adFooCounter.textContent;

    return {
        fooClick,
        fooRenderValue,
        fooCounterValue,
        adFooClick,
        adFooRenderValue,
        adFooCounterValue,
        unmount
    }
}

describe("렌더 최적화를 위해서는 상태 참조를 컴포넌트 안에서 하는게 좋다.", () => {
    let componentRef: any;
    //테스트 전 한번 실행.
    beforeAll(async () => {
        componentRef = await renderTestComp();
    });

    afterAll(() => {
        //컴포넌트 제거
        componentRef.unmount();
        componentRef = undefined; //참조 제거
    });

    it("FooApp, FooAppAdvance 모두 counter값은 3을 가진다.", async () => {
        componentRef.fooClick();
        componentRef.adFooClick();
        componentRef.adFooClick();
        expect(componentRef.fooCounterValue()).toEqual("3");
        expect(componentRef.adFooCounterValue()).toEqual("3");
    })
    it("FooApp는 FooAppAdvance보다 3번 더 rendering된다.", () => {
        expect(componentRef.fooRenderValue()).toEqual("4");
        expect(componentRef.adFooRenderValue()).toEqual("1");

    })

});

