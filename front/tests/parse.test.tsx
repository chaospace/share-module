/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";
import styled from "styled-components";
import "jest-styled-components";

describe("styled-component스타일 파싱 테스트", () => {
    //template literal방식이 아닌 함수 방식을 이용하면 결국 render후 kebab-case로 변경한다.
    const space = () => ({
        borderRadius: '10px',
        fontSize: "19px"
    });
    const Box = styled.div(space);
    Box.displayName = "Box";
    it("render후 스타일은 저절로 케밥케이스로 변경된다.", () => {
        const result = renderer.create(<Box />).toJSON();
        expect(result).toHaveStyleRule("border-radius", "10px");
        expect(result).toMatchSnapshot();
    });
});