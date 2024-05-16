import { createStyleComposer } from "styled-composer";



describe("로컬 모듈 참조 테스트", () => {
    it("참조된 composer에 접근가능하다", () => {
        const composer = createStyleComposer({
            mx: {
                property: ["marginLeft", "marginRight"],
                alias: "space"
            }
        });
        const style = composer({
            theme: {
                space: [0, 2, 4, 6, 8]
            },
            mx: 2
        });
        expect(style).toEqual({
            marginLeft: 4,
            marginRight: 4
        })
    })
});