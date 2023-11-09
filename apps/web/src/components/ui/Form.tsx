import {
  cloneElement,
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactElement,
} from "react";
import {
  FormProvider,
  UseFormProps,
  useFormContext,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tv } from "tailwind-variants";

import { createComponent } from ".";
import { z } from "zod";
import clsx from "clsx";

const inputStyle =
  "block w-full p-2 border border-gray-800 focus:outline-[#000000] rounded-lg";
const input = {
  base: inputStyle ,
};
const textarea = {
  base: `${inputStyle} resize-none`,
};
const label = {
  base: "text-sm font-medium text-gray-500",
};

export const Input = createComponent("input", tv(input));
export const Select = createComponent("select", tv(input));
export const Textarea = createComponent("textarea", tv(textarea));
export const Label = createComponent("label", tv(label));

export const FormControl = ({
  name,
  label,
  hint,
  children,
  className,
}: {
  name: string;
  label: string;
  hint?: string;
} & ComponentPropsWithoutRef<"fieldset">) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  return (
    <fieldset className={clsx("mb-2 flex-1", className)}>
      <Label htmlFor={name}>{label}</Label>
      {cloneElement(children as ReactElement, { id: name, ...register(name) })}
      {hint ? <div className="pt-1 text-xs text-gray-500">{hint}</div> : null}
      {error ? (
        <div className="pt-1 text-xs text-red-500">
          {error.message as string}
        </div>
      ) : null}
    </fieldset>
  );
};

export interface FormProps<S extends z.ZodType<any, any>>
  extends PropsWithChildren {
  defaultValues?: UseFormProps<z.infer<S>>["defaultValues"];
  schema: S;
  onSubmit: (values: z.infer<S>) => void;
}

export function Form<S extends z.ZodType<any, any>>({
  defaultValues,
  schema,
  children,
  onSubmit,
}: FormProps<S>) {
  // Initialize the form with defaultValues and schema for validation
  const form = useForm({ defaultValues, resolver: zodResolver(schema) });
  // Pass the form methods to a FormProvider. This lets us access the form from components without passing props.
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
