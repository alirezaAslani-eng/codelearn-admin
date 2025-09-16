import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MuiButton } from "../../ui";
const defProps = {
  actions: {
    open: false,
  },
  title: "",
  text: "",
  customButtons: <></>,
  customText: <></>,
};

export default function ShowTextModal(props) {
  const { actions, title, text, customButtons, customText } = {
    ...defProps,
    ...props,
  };
  const [isMount, setIsMounte] = useState(false); // control ShowTextModal by its self .

  useEffect(() => {
    setIsMounte(actions?.open || false);
  }, [actions?.open]);

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

            <div
              className={` 
                w-full 
                p-2.5
                min-h-[200px] 
                max-h-[200px] 
                overflow-y-auto
                text-sm 
                rounded-xl 
                bg-transparent 
                placeholder-text-dark/70 
                dark:placeholder-text-light/70 
                outline-none
                border 
              border-primary-light/50 
              focus:border-primary-light
                `}
            >
              <p className="text-wrap break-words">{text}</p>
              {customText}
            </div>
            {/* Button section ------------------- > */}
            <section className="flex justify-between items-end">
              <div className="flex items-center gap-x-3 mt-3">
                {/* clos modal button */}
                <MuiButton
                  type="button"
                  variant="contained"
                  onClick={() => {
                    try {
                      actions.onCancel(); // call your func
                    } catch (err) {
                      console.log(err);
                    }
                    setIsMounte(false); // close its self (interal state)
                  }}
                >
                  بستن
                </MuiButton>
                {customButtons}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
