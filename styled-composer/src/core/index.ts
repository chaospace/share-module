import bg from '@/properties/background';
import border from '@/properties/border';
import display from '@/properties/display';
import flex from '@/properties/flex';
import position from '@/properties/position';
import size from '@/properties/size';
import space from '@/properties/space';
import typography from '@/properties/typography';
import { CSSProperties } from 'react'

const isArray = (o: unknown): o is [] => Array.isArray(o);


const keyword = {
    ...position,
    ...space,
    ...display,
    ...border,
    ...size,
    ...bg,
    ...flex,
    ...typography
} as const;

const allKeywordName = Object.keys(keyword);

type StyleValueType = string | number | (string | number)[];
type StyleProcessorParameter = Partial<{
    property: string | string[],
    alias: string;
    interpreter: Function
    defaultAlias: StyleValueType;
}>;

type PropsKeyType = string | number;
type StyleStateKeyWord = keyof typeof keyword;
type StyleComposerState = Record<StyleStateKeyWord[number], StyleProcessorParameter | boolean>;
type StyleObject = {
    [P in keyof CSSProperties]?: string | number
}

type CSSComposerObject = {
    [P in StyleStateKeyWord]?: number | string | (number | string)[];
}

interface StyleProcessor {
    (key: any, provider: any, replaceValue: any): any;
    alias?: string;
    defaultAlias?: string | number | (number | string)[];
}


type ProcessorStore = Record<StyleStateKeyWord[number], StyleProcessor>;
type ComposerContext<Props extends object = {}> = { theme?: any } & CSSComposerObject & Props;
interface StyleComposer {
    <Props extends object = {}>(props: ComposerContext<Props>): any;
    propNames: StyleStateKeyWord[number][],
    processors: ProcessorStore;
}

const getOrReplaceValue = <T extends PropsKeyType>(key: T, provider?: any, replaceValue?: T) => {
    const keys = typeof key === 'string' ? key.split('.') : [key];
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

const isStyleProcessorConfig = (b: StyleProcessorParameter | boolean): b is StyleProcessorParameter => typeof b !== 'boolean';

const createStyleProcessor = ({ property, alias, interpreter = getKeyValue, defaultAlias }: StyleProcessorParameter): StyleProcessor => {
    const properties = isArray(property) ? property : [property as string];
    const processor = (key: any, provider: any, replaceValue: any) => {
        const style: any = {};
        const n = interpreter(key, provider, replaceValue);
        if (n === null) return style;
        for (let i = 0; i < properties.length; i++) {
            style[properties[i]] = n;
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
        const config = state[key as StyleStateKeyWord];
        store[key] = isStyleProcessorConfig(config) ? createStyleProcessor(config) : createStyleProcessor({
            alias: key,
            property: key
        });
    }

    return store;
}

const createStyleComposer = (state: StyleComposerState = keyword): StyleComposer => {
    const processorStore = createStyleProcessorStore(state);
    const composer = <Props extends object = {}>(context: ComposerContext<Props>) => {
        const style: StyleObject = {};
        for (let key in context) {
            const processor = processorStore[key];
            if (!processor) continue;
            const rawValue = context[key as StyleStateKeyWord];
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


export type {
    StyleComposer,
    StyleStateKeyWord,
    CSSComposerObject
}
export {
    createStyleProcessor,
    createStyleProcessorStore,
    createStyleComposer,
    keyword,
    allKeywordName
}