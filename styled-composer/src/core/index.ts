import { CSSProperties } from "react"



const spaceProperties = {
    m: {
        property: "margin",
        alias: "space"
    },
    mx: {
        property: ["marginLeft", "marginRight"],
        alias: "space"
    },
    my: {
        property: ["marginTop", "marginBottom"],
        alias: "space"
    },
    p: {
        property: "padding",
        alias: "space"
    },
    px: {
        property: ["paddingLeft", "paddingRight"],
        alias: "space"
    },
    py: {
        property: ["paddingTop", "paddingBottom"],
        alias: "space"
    },
}

const displayProperties = {
    display: true,
    overflow: true,
    overflowX: true,
    overflowY: true,
}

const positionProperties = {
    position: true,
    top: {
        property: "top",
        alias: "space"
    },
    left: {
        property: "left",
        alias: "space"
    },
    right: {
        property: "right",
        alias: "space"
    },
    bottom: {
        property: "bottom",
        alias: "space"
    },
    zIndex: {
        property: "zIndex",
        alias: "zIndices"
    }
}

const sizeProperties = {
    width: {
        proerty: "width",
        alias: "size"
    },
    height: {
        proerty: "height",
        alias: "size"
    },
    maxWidth: {
        proerty: "maxWidth",
        alias: "size"
    },
    maxHeight: {
        proerty: "maxHeight",
        alias: "size"
    }
}

const borderProperties = {
    border: true,
    borderWidth: true,
    borderStyle: true,
    borderColor: {
        property: "borderColor",
        alias: "color"
    }
}

const styleProperties = {
    ...positionProperties,
    ...spaceProperties,
    ...displayProperties,
    ...borderProperties,
    ...sizeProperties
} as const;

type StyleValueType = string | number | (string | number)[];
type StyleProcessorConfig = Partial<{
    property: string | string[],
    alias: string;
    interpreter: Function
    defaultAlias: StyleValueType;
}>;

type PropsKeyType = string | number;
type StyleComposeKeyProperties = keyof typeof styleProperties;
type StyleComposerState = Record<StyleComposeKeyProperties[number], StyleProcessorConfig | boolean>;
type StyleObject = {
    [P in keyof CSSProperties]?: string | number
}
const getOrReplaceValue = <T extends PropsKeyType>(key: T, provider?: any, replaceValue?: T) => {
    const keys = typeof key === "string" ? key.split(".") : [key];
    for (let i = 0; i < keys.length; i++) {
        if (provider !== undefined && provider[keys[i]]) {
            provider = provider[keys[i]];
        } else {
            provider = undefined;
            break;
        }
    }
    return provider === undefined ? replaceValue : provider;
}

const getKeyValue = (key: string | number, provider: StyleValueType) => getOrReplaceValue(key, provider, key);

const isStyleProcessorConfig = (b: StyleProcessorConfig | boolean): b is StyleProcessorConfig => typeof b !== "boolean";

const createStyleProcessor = ({ property, alias, interpreter = getKeyValue, defaultAlias }: StyleProcessorConfig) => {
    const properties = Array.isArray(property) ? property : [property];
    const processor = (key: any, provider: any, replaceValue: any) => {
        const style: any = {};
        const n = interpreter(key, provider, replaceValue);
        if (n === null) return style;
        for (let i = 0; i < properties.length; i++) {
            style[properties[i]!] = n;
        }
        return style;
    }
    processor.alias = alias;
    processor.defaultAlias = defaultAlias;
    return processor;
}

const createStyleProcessorStore = (state: StyleComposerState) => {
    const store: any = {};
    for (let key in state) {
        const config = state[key as StyleComposeKeyProperties];
        store[key] = isStyleProcessorConfig(config) ? createStyleProcessor(config) : createStyleProcessor({
            alias: key,
            property: key
        });
    }

    return store;
}

const createStyleComposer = (state: StyleComposerState) => {
    const processorStore = createStyleProcessorStore(state);
    const composer = (context: any) => {
        const style: StyleObject = {};
        for (let key in context) {
            const processor = processorStore[key];
            if (!processor) continue;
            const rawValue = context[key];
            const provider = getOrReplaceValue(processor.alias, context.theme, processor.defaultAlias);
            if (rawValue !== null) {
                Object.assign(style, processor(rawValue, provider, context));
            }
        }
        return style;
    }
    composer.propNames = Object.keys(processorStore);
    composer.processors = processorStore;
    return composer;
}



export {
    createStyleProcessor,
    createStyleProcessorStore,
    createStyleComposer,
    styleProperties
}