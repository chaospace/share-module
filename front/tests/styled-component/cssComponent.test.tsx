/**
 * @jest-environment jsdom
 */

import { PropsWithCSSAttributes, PropsWithHTMLAttributes } from "@/components/types";
import { cssComposer } from "@/styles/utils";
import styled from "styled-components";
import "jest-styled-components";
import renderer from "react-test-renderer";
const Foo = styled("div").withConfig({
    shouldForwardProp: prop => !['css'].includes(prop)
})<PropsWithCSSAttributes<PropsWithHTMLAttributes<"div", {}>>>(cssComposer);


const Bar = styled("button")(() => ({
    color: "#ff00cc",
    fontSize: "20px",
    border: "1px solid black",
    ['&:hover']: {
        backgroundColor: "black"
    }
}));

describe("css속성을 이용한 composer테스트", () => {

    it("css속성을 동작 테스트", () => {
        const json = renderer.create(<Foo css={ {
            border: "1px solid black",
            p: "4px"
        } } />).toJSON();
        expect(json).toHaveStyleRule("padding", "4px");
        console.log(json);
    });

    it.only('hover스타일 테스트', () => {
        const json = renderer.create(<Bar />).toJSON();
        console.log(json);
    })
});