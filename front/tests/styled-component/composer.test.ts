import { createStyleComposer, composer as defaultComposer, shouldForwardAllProps } from "styled-composer";



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
    });

    it("이미 구성된 composer이용", () => {
        const style = defaultComposer({
            theme: {
                space: [0, 2, 4, 6, 8, 16, 22],
                colors: {
                    blue: {
                        main: "#00ff00",
                        light: "#0000ff",
                        dark: "#00ff00"
                    }
                }
            },
            background: "url(/test.bg.jpg); no-repeat center",
            backgroundSize: "cover",
            borderWidth: "2px",
            p: 4
        });
        console.log(style);
    });

    it("shouldForwardAllProps동작 확인", () => {
        expect(shouldForwardAllProps("mx")).toEqual(false);
        expect(shouldForwardAllProps("background")).toEqual(false);
        expect(shouldForwardAllProps("flex")).toEqual(true);
    });




});  