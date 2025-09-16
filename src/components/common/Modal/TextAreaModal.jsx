import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MuiButton } from "../../ui";
import { motion } from "framer-motion";
const defProps = {
  actions: {
    onSubmit: (formValue) => {},
    onCancel: () => {},
    open: false,
  },
  hasSchema: false, // if you dont want any validating on textarea or you you want -> definde by this prop
  schema: {}, // schema shoud be a {} like defaultSchema if you want .
  name: "text-area", // <txtarea name={name} />
  title: "",
  placeholder: "متن خود را بنویسید",
};
const defSubmiter = () => {
  console.log("send submit method ");
};

export default function TextAreaModal(props) {
  const { actions, name, schema, hasSchema, title, placeholder } = {
    ...defProps,
    ...props,
  };
  const [isMount, setIsMounte] = useState(false); // control TextAreaModal by its self .
  const defaultSchema = z.object({ [name]: z.any() }); // default validation for textarea .

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(hasSchema ? schema : defaultSchema) });

  useEffect(() => {
    setIsMounte(actions?.open || false);
  }, [actions?.open]);

  console.log(errors);

  return (
    <>
      {isMount && (
        <div
          className="p-5
         w-full 
         h-full 
         font-dana-md 
         bg-secondary-light 
         dark:bg-secondary-dark 
         text-text-dark 
         dark:text-text-light 
         border-primary-light 
         border-2 
         rounded-lg "
        >
          <div>
            {title}
            <fieldset disabled={isSubmitting}>
              <form
                className="w-full"
                onSubmit={handleSubmit(actions?.onSubmit || defSubmiter)}
              >
                <textarea
                  placeholder={placeholder}
                  className={` 
                w-full 
                p-2.5
                min-h-[200px] 
                max-h-[200px] 
                text-sm 
                rounded-xl 
                bg-transparent 
                placeholder-text-dark/70 
                dark:placeholder-text-light/70 
                outline-none
                
                border 
                ${
                  errors?.[name]
                    ? " border-red-500/50 focus:border-red-500"
                    : "border-primary-light/50 focus:border-primary-light"
                }
                `}
                  {...register(name)}
                ></textarea>
                <section className="flex justify-between items-end">
                  {/* Button section ------------------- > */}
                  <div className="flex items-center gap-x-3 mt-3">
                    {/* Submit */}

                    {isSubmitting ? (
                      <CircularProgress size="20px" />
                    ) : (
                      <MuiButton variant="contained" type="submit">
                        ارسال
                      </MuiButton>
                    )}

                    {/* Cancel */}
                    <motion.div layout>
                      <MuiButton
                        type="button"
                        variant="contained"
                        color="error"
                        onClick={() => {
                          try {
                            actions.onCancel(); // call your func
                          } catch (err) {
                            console.log(err);
                          }
                          setIsMounte(false); // close its self (interal state)
                        }}
                      >
                        لغو
                      </MuiButton>
                    </motion.div>
                  </div>
                  {/* Errro section --------------- > */}
                  {errors?.[name] && (
                    <div
                      className="
                  p-2 
                  text-sm 
                  rounded-lg 
                  bg-red-500/20 
                  text-red-500  
                  animate-initialShow 
                  will-change-transform"
                    >
                      {errors?.[name]?.message ?? ""}
                    </div>
                  )}
                </section>
              </form>
            </fieldset>
          </div>
        </div>
      )}
    </>
  );
}
