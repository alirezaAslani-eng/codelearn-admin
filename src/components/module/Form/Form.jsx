import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
const defProps = {
  inputs: [],
  schema: null,
  onSubmit: async () => {},
  formTagClassName: "",
  submitButton: <button type="submit">submit button jsx</button>,
  set: (yourFn) => `yourFn("setValue")`,
};
export default function Form(props) {
  const { inputs, schema, onSubmit, formTagClassName, submitButton, set } = {
    ...defProps,
    ...props,
  };
  // handled by react hook form version 7.56.0 .
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    try {
      set(setValue);
    } catch (err) {
      console.log(err);
    }
  }, [setValue]);

  return (
    <fieldset disabled={isSubmitting}>
      <form className={`${formTagClassName}`} onSubmit={handleSubmit(onSubmit)}>
        {inputs?.map((Item, index) => {
          if (!!Item?.InputComponent) {
            return (
              <Controller
                key={index}
                name={Item?.name}
                control={control}
                render={(fieldObject) => {
                  const { field } = fieldObject;

                  return (
                    <Item.InputComponent
                      field={{
                        // Required Props
                        name: field.name,
                        type: Item?.type,
                        onChange: (e) =>
                          Item?.type === "file"
                            ? field.onChange(e.target.files?.[0])
                            : field.onChange(e.target.value),
                        onBlur: field.onBlur,
                        ref: field.ref,
                        ...(Item?.type == "file"
                          ? {}
                          : { value: field.value || "" }),
                      }}
                      manualSetValue={setValue}
                      error={errors?.[Item?.name]?.message}
                    />
                  );
                }}
              />
            );
          }
        })}
        {submitButton}
      </form>
    </fieldset>
  );
}
