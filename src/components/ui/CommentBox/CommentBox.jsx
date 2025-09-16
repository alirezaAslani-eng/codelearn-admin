import React, { useState } from "react";
import ConfrimeBox from "../ConfrimeBox/ConfrimeBox";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import MuiButton from "../Buttons/MuiButton";
const defProps = {
  course: "",
  createdAt: "",
  creator: {},
  body: "",
  actions: {},
  _id: "",
  answer: 1,
  answerContent: {},
};

export default function CommentBox(props) {
  const {
    course,
    createdAt,
    creator,
    body,
    actions,
    _id,
    answer,
    answerContent,
  } = {
    ...defProps,
    ...props,
  };
  const [answerValue, setAnswerValue] = useState("");
  const callOnRemove = () => {
    try {
      actions?.onRemove(_id);
    } catch (err) {
      console.log(err);
    }
  };
  const callOnReject = () => {
    try {
      actions?.onReject({ id: _id, body });
    } catch (err) {
      console.log(err);
    }
  };
  const callOnAccept = () => {
    try {
      actions?.onAccept({ id: _id, body });
    } catch (err) {
      console.log(err);
    }
  };
  const callOnBan = () => {
    try {
      actions?.onBan(creator?._id);
    } catch (err) {
      console.log(err);
    }
  };
  const callOnAnswer = () => {
    try {
      if (answerValue.trim()) {
        actions?.onAnswer({ body: answerValue, id: _id });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      <section
        className={`secondary_box_color secondary_shadow secondary_text_color secondary_shadow_color p-3 space-y-3 font-dana-md rounded-xl   ${
          !!!answer && "warning-after"
        } `}
      >
        {/* header */}
        <div className=" rounded-xl">
          <div className="w-full p-3 ">
            <h1>{course}</h1>
          </div>
          <div className="flex justify-between items-start p-3">
            <aside>
              <div className="flex items-center gap-x-2">
                <div className="profile"></div>
                <div className="flex flex-col gap-y-0.5">
                  <span>{creator?.name || "مسدود شده"}</span>
                  <span className="text-secondary-dark/80 dark:text-secondary-light/80">
                    {createdAt?.slice(0, 10)}
                  </span>
                </div>
              </div>
            </aside>
            <aside>
              <div className="flex items-center gap-x-2">
                <ConfrimeBox
                  disabled={actions?.disabled}
                  onRemove={callOnRemove}
                />
                <ConfrimeBox
                  ButtonIcon={<ThumbUpRoundedIcon className="!text-xs" />}
                  buttonClassName="primary_btn_theme xs_btn_size"
                  buttonText="تایید کامنت"
                  disabled={answer == true}
                  onRemove={callOnAccept}
                />
                <ConfrimeBox
                  ButtonIcon={<ThumbDownRoundedIcon className="!text-xs" />}
                  buttonText="رد کامنت"
                  disabled={answer == false}
                  onRemove={callOnReject}
                />
                <ConfrimeBox
                  ButtonIcon={<ThumbDownRoundedIcon className="!text-xs" />}
                  buttonText="مسدود"
                  disabled={actions?.disabled}
                  onRemove={callOnBan}
                />
              </div>
            </aside>
          </div>
        </div>
        {/* body */}
        <div className=" max-h-[200px] overflow-y-auto px-3">{body}</div>
        {/* Answer body */}
        <div className="flex gap-x-2">
          {!answerContent ? (
            <MuiButton onClick={callOnAnswer}>{"پاسخ"}</MuiButton>
          ) : (
            <div className="flex gap-x-2">
              {" پاسخ داده شد توسط"} : <p>{answerContent?.creator?.name}</p>
            </div>
          )}
        </div>

        {answerContent ? (
          <div className=" max-h-[100px] bg-success-light/30  overflow-y-auto">
            {answerContent?.body}
          </div>
        ) : (
          <input
            type="text"
            value={answerValue}
            onChange={(e) => setAnswerValue(e.target.value)}
          />
        )}
      </section>
    </div>
  );
}

const x = {
  _id: "6368d3f02b06ef378841d33c",
  body: "کامنت فیک برای تست تایید کامنت‌ها :))",
  course: "دوره NPM برای برنامه نویسان جاوا اسکریپت",
  creator: {
    _id: "634e6b0e1d5142b91afa9bb3",
    username: "amin_saeedi",
    email: "ce01010101it@gmail.com",
    name: "محمدامین سعیدی راد",
    role: "ADMIN",
    createdAt: "2022-10-18T08:59:58.561Z",
    updatedAt: "2025-04-25T18:41:38.219Z",
    __v: 0,
    //     profile: "/codelearn-admin/images/saeedi.png",
    phone: "09918765421",
  },
  answer: 0,
  isAnswer: 0,
  createdAt: "2022-11-07T09:46:24.424Z",
  updatedAt: "2022-11-10T08:31:25.551Z",
  __v: 0,
  score: 5,
  answerContent: null,
};
