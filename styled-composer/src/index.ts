import { createStyleComposer, keyword, allKeywordName } from "@/core";

const composer = createStyleComposer(keyword);

const shouldForwardAllProps = (prop: string) => !allKeywordName.includes(prop);

export {
    composer,
    createStyleComposer,
    shouldForwardAllProps
}