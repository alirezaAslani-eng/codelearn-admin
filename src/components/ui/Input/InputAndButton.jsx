import { useState } from "react";
import { useForm } from "react-hook-form";
import PercentRoundedIcon from "@mui/icons-material/PercentRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const defProps = {
  onSubmit: () => {},
};
export default function InputAndButton({
  // event
  onSubmit = defProps.onSubmit,
  // state
  isPending = false,
  isError = false,
  isSuccess = false,
  // date
  name = "",
  schema = z.object({}),
}) {
  const [isShowInput, setIsShowInput] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <>
      {!isShowInput ? (
        <button
          onClick={() => {
            setIsShowInput(true);
            reset();
          }}
          className="flex items-center w-full justify-between  p-3 rounded-xl font-dana-md bg-info-light/20 text-info-light hover:scale-[.98] active:scale-95 transition-all"
        >
          <span className="flex items-center gap-x-2">
            <PercentRoundedIcon />
            {"تخفیف همه گانی"}
          </span>
          <ArrowBackRoundedIcon />
        </button>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex text-sm gap-x-3 font-dana-md"
        >
          <input
            {...register(name)}
            placeholder="تخفیف را به عدد بنویسید ! "
            type="text"
            className={`p-3 flex-1 min-w-0 border border-info-light text-text-dark/90 dark:text-text-light/90 bg-transparent rounded-xl outline-none 
               ${
                 errors?.[name]?.message &&
                 "border-danger-light text-danger-light"
               }
              ${isError && "border-danger-light text-danger-light"}
              ${isSuccess && "border-success-light text-success-light"}
            `}
          />
          <button
            onClick={() => setIsShowInput(false)}
            type="button"
            className="text-danger-light bg-danger-light/20 p-3 font-dana-md rounded-xl"
          >
            {isPending ? "کمی صیر کنید" : "بستن"}
          </button>
        </form>
      )}
    </>
  );
}
