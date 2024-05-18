//merge 테스트


const assign = (a: Record<string, any>, b: Record<string, any>) => {
    for (let prop in b) {
        a[prop] = typeof b[prop] === "object" ? merge(a[prop] || {}, b[prop]) : b[prop];
    }
    return a;
}


const merge = (a: Record<string, any>, b: Record<string, any>) => {
    let result = assign({}, a);
    return assign(result, b);
}


describe("객체 merge테스트", () => {
    it("일반 속성 merge", () => {
        const c = merge({ name: "cc" }, { age: 20, job: "fe" })
        expect(c).toEqual({
            name: "cc",
            age: 20,
            job: "fe"
        });
    });

    it("중첩 merge", () => {
        const c = merge({
            name: "chaospace",
            skill: "javascript"
        }, {
            profile: {
                id: 30,
                url: "test.jpg",
                map: {
                    height: 30
                }
            }
        });
        console.log('c', c);
        expect(c).toEqual({
            name: "chaospace",
            skill: "javascript",
            profile: {
                id: 30,
                url: "test.jpg",
                map: {
                    height: 30
                }
            }
        })
    });

    it("같은 속성 override", () => {
        const a = {
            name: "c",
            profile: {
                url: "ccc.jpg",
                description: "typograph"
            }
        };
        const b = {
            name: "user",
            profile: {
                id: 30
            }
        }
        const c = merge(a, b);
        expect(c).toEqual({
            name: "user",
            profile: {
                url: "ccc.jpg",
                description: "typograph",
                id: 30
            }
        });
    });
});


/**
 * '&:hover'
 *  pesudo:"&:after" 
 *  pesudo:"&:hover"
 */