/**
 * @jest-environment jsdom
 */

// 리액트 환경 동작 테스트
import { useAppStore, countHooks } from "@/store";
import { fireEvent, render } from "@testing-library/react";


const FooApp = () => {
    const { useSetCount, useCount } = countHooks;
    const count = useCount();
    const setCount = useSetCount();

    return (
        <main onClick={ () => setCount(count + 1) }>
            hello! { count }
        </main>
    )
}

describe("zustand 리액트 환경 동작 테스트", () => {
    it("render를 통한 돔 초기화", async () => {
        const { findByRole } = render(<FooApp />);
        const element = await findByRole("main");
        expect(element).toBeInTheDocument();
    });

    it("메인 클릭 시 count 1 증가", async () => {
        const { findByRole } = render(<FooApp />);
        const element = await findByRole("main");
        // click이벤트 발생.
        fireEvent.click(element);
        expect(element).toHaveTextContent("hello! 1");
    });
})

