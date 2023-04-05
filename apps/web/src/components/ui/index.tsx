import { forwardRef } from "react";
import { TV, TVReturnType, TVSlots } from "tailwind-variants";

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

type ComponentProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, {}>;

type PolyComponent = <C extends React.ElementType>(
  props: ComponentProps<C>
) => React.ReactElement | null;

export function createComponent(
  tag: string | PolyComponent,
  variant: TVReturnType<any, any, any, any, any, any>
) {
  const _Component = forwardRef(
    <C extends React.ElementType>(
      { as, className, ...props }: ComponentProps<C>,
      ref?: PolymorphicRef<C>
    ) => {
      const Component = as || tag;

      return (
        <Component
          ref={ref}
          className={variant({ class: className, ...props })}
          {...props}
        />
      );
    }
  ) as any;
  _Component.displayName = "Component";
  return _Component;
}
