import { createStyleComposer, styleProperties } from "@/core";



describe("동작테스트", () => {
    const composer = createStyleComposer(styleProperties);
    it("composer구성", () => {
        // const composer = createStyleComposer(styleProperties);
        expect(composer).toHaveProperty("processors");
        expect(composer).toHaveProperty("propNames");
    });
    it("composer를 이용한 스타일 구성", () => {
        const style = composer({
            theme: {
                space: [0, 2, 4, 6, 8, 12, 16, 18, 20],
                color: {
                    blue: ['aa', 'bb', 'ccc']
                }
            },
            position: "relative",
            mx: 20,
            width: 100,
            maxWidth: 500,
            p: 3,
            borderColor: 'blue.2'
        });
        console.log('style', style);
        // expect(style.width).toEqual(100);
    });
})