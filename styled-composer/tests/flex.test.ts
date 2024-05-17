
import { StyleComposer, createStyleComposer } from "@/core";
import flex from "@/properties/flex";



describe("flex 스타일 동작 확인", () => {
    let composer: StyleComposer;
    beforeAll(() => {
        composer = createStyleComposer(flex) as StyleComposer;
    })
    it("composer구성", () => {
        // console.log(composer.propNames);
        expect(composer.propNames).toHaveLength(composer.propNames.length);
    })

    it("flex속성 파싱 테스트", () => {
        const style = composer({
            flexDirection: "column",
            gap: 3,
            flexGrow: 1
        });
        console.log(style);
        expect(style.gap).toEqual(3);
    });


    it("theme에 값이 있으면 theme값을 우선한다", () => {
        const style = composer({
            theme: {
                space: [0, 2, 4, 8, 12, 16, 20, 24, 32]
            },
            flexDirection: "row",
            gap: 3,
            flexWrap: "unwrap"
        });
        expect(style.gap).toEqual(8);
        expect(style.flexWrap).toEqual("unwrap");
    });
});