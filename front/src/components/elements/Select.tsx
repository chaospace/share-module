import styled from "styled-components";
import { CSSComposerObject, composer, shouldForwardAllProps } from "styled-composer";
import { PropsWithHTMLAttributes } from "../types";
import React from "react";


interface SelectBaseProps extends PropsWithHTMLAttributes<"select", CSSComposerObject> { }
interface SelectProps<T> extends SelectBaseProps {
    options: T[],
    getLabel?(o: T): string;
    getValue?(o: T): any;
}

const Base = styled("select").withConfig({
    shouldForwardProp: shouldForwardAllProps
})<SelectBaseProps>(composer);
type OptionType = { label: string, value: string };
type Getter = (o: any) => string;
const defaultValue = (o: any) => o.value || o;
const defaultLabel = (o: any) => o.label || o;
const composeOptionItem = (o: any, labelGetter: Getter, valueGetter: Getter) => {
    return { label: labelGetter(o), value: valueGetter(o) };
}
const Select = <T extends {} | string>({ ref, options = [], getLabel = defaultLabel, getValue = defaultValue, ...rest }: SelectProps<T>) => {

    const onChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('selected-index', target.value);
    }

    return (
        <Base { ...rest } onChange={ onChange }>
            {
                options?.map((o, idx) => {
                    const vo: OptionType = composeOptionItem(o, getLabel, getValue);
                    return (<option value={ vo.value } key={ idx }>{ vo.label }</option>);
                })
            }
        </Base>
    )
}


export default Select;