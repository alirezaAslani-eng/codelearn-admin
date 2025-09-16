import React, { useState } from "react";
import MuiButton from "../Buttons/MuiButton";
const defProps = { answer: "" };
export default function AnswerBox(props) {
  const { answer } = { ...defProps, ...props };
  const [isShowAll, setIsShowAll] = useState(false);
  return (
    <div>
      <div className="w-full p-2 sticky bottom-0 break-words shadow bg-background-light text-wrap dark:bg-background-dark rounded-[_22px_22px_0px_22px] ">
        {answer ? (
          <section>
            {isShowAll ? (
              <p className="">{answer}</p>
            ) : (
              <p className="line-clamp-1">{answer}</p>
            )}
          </section>
        ) : (
          "پاسخی ثبت نشده"
        )}

        {answer && (
          <section className="mt-2">
            {isShowAll ? (
              <MuiButton
                variant={"contained"}
                onClick={() => {
                  setIsShowAll(false);
                }}
              >
                کمتر
              </MuiButton>
            ) : (
              <MuiButton
                variant={"contained"}
                onClick={() => {
                  setIsShowAll(true);
                }}
              >
                بیشتر
              </MuiButton>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
