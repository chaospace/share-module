import React from "react";

type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
type Merge<A, B> = Omit<A, keyof B> & B;
type DistributiveMerge<A, B> = DistributiveOmit<A, keyof B> & B;

type AsProps<
    Component extends React.ElementType,
    PermanentProps extends object,
    ComponentProps extends object> = DistributiveMerge<ComponentProps, PermanentProps & { as?: Component }>


//기존속성에 as를 추가하기 위해 omit을 사용해 override를 처리.
//단 elementType에 문자열이 들어갈 경우 key목록으로 추론되기 때문에 분배조건부 처리를 적용해 모든 속성을 걸러낸다.

type PolymorphicWithRef<
    Default extends OnlyAs,
    Props extends {},
    OnlyAs extends React.ElementType = React.ElementType
> = <T extends OnlyAs = Default>(props: AsProps<T, Props, React.ComponentPropsWithRef<T>>) => React.ReactNode | null;

type PolyForwardComponent<
    Default extends OnlyAs,
    Props extends object = {},
    OnlyAs extends React.ElementType = React.ElementType
//forwardRef과 결국 같은 타입을 리턴한다. ->여기서는 merge를 이용해 두개를 묶는 이유는 무엇?
> = Merge<
    React.ForwardRefExoticComponent<Merge<React.ComponentPropsWithoutRef<Default>, Props & { as?: Default }>>,
    PolymorphicWithRef<Default, Props, OnlyAs>
>

/**
 * function forwardRef<T, P = {}>(
        render: ForwardRefRenderFunction<T, P>,
    ): 
    // P에서 ref를 제거한 타입과 ref를 추가할 타입을 intersection 후 리턴.
    ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
 */

type PolyRefFunction = <
    Default extends OnlyAs,
    Props extends object = {},
    OnlyAs extends React.ElementType = React.ElementType
>
    (
        Component: React.ForwardRefRenderFunction<Default, Props & { as?: OnlyAs }>
    ) => PolyForwardComponent<Default, Props, OnlyAs>;

const polymorphicFowardRef = React.forwardRef as PolyRefFunction;

const Box = polymorphicFowardRef<"div", { open?: boolean }>(({ as: Element = "div", ...props }, ref) => {
    return (
        <Element ref={ ref } { ...props } />
    )
});

export default Box;