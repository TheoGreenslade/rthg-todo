import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { Field, Textarea, TextareaProps, Label } from "@headlessui/react";

type FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = TextareaProps & {
  label: string;
  control: UseControllerProps<TFieldValues, TName>["control"];
  name: UseControllerProps<TFieldValues, TName>["name"];
  rules?: UseControllerProps<TFieldValues, TName>["rules"];
};

export function FormTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormTextareaProps<TFieldValues, TName>) {
  const { label, control, rules, name, className, ...rest } = props;
  return (
    <Controller
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Field className="flex flex-col space-y-1">
          <Label className="text-gray-400">{label}</Label>
          <Textarea
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            className={`${className} bg-gray-800 text-white p-2 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-gray-500`}
            {...rest}
          />
          {error && (
            <p className="text-red-900 text-sm mt-1">{error.message}</p>
          )}
        </Field>
      )}
      rules={rules}
      control={control}
      name={name}
    />
  );
}
