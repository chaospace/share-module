import styled from "styled-components";
import { CSSComposerObject, composer, shouldForwardAllProps } from "styled-composer";
import { PropsWithHTMLAttributes } from "../types";
import React, { ChangeEvent } from "react";


interface SelectBaseProps extends PropsWithHTMLAttributes<"select", CSSComposerObject> { }
interface SelectProps extends SelectBaseProps {
    options: any[],
    getLabel?(o: any): string;
    getValue?(o: any): string;
    onChange?(o: any): void;
}

const Base = styled("select").withConfig({
    shouldForwardProp: shouldForwardAllProps
})<SelectBaseProps>(composer);
type OptionType = { label: string, value: string };
type Getter = (o: any) => string;
const defaultValue = (o: any) => o.value || o.label || o;
const defaultLabel = (o: any) => o.label || o.value || o;
const composeOptionItem = (o: any, labelGetter: Getter, valueGetter: Getter): OptionType => {
    return { label: labelGetter(o), value: valueGetter(o) };
}
const Select = ({ ref,
    options = [],
    getLabel = defaultLabel,
    getValue = defaultValue,
    onChange,
    ...rest }: SelectProps) => {

    const onChangeHandler = ({ target }: ChangeEvent<HTMLSelectElement>) => {
        const select = options[target.selectedIndex];
        onChange && onChange(select);
    }

    return (
        <Base { ...rest } onChange={ onChangeHandler }>
            {
                options?.map((o, idx) => {
                    const vo = composeOptionItem(o, getLabel, getValue);
                    return (<option value={ vo.value } key={ idx }>{ vo.label }</option>);
                })
            }
        </Base>
    )
}

export { defaultLabel, defaultValue, composeOptionItem }
export default Select;