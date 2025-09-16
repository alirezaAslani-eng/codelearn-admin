import React, { useState } from "react";
import MuiButton from "../Buttons/MuiButton";
// icon ====>>
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// PLEASE READ IT !!!!!!!!!
// important Features of  ContactBox are that when onAnswerClick is run you can
// get a parametr as email value and you also can do some actions like open a modal !!
// and also onRemoveClick get a method and send _id as parametr !!
export default React.memo(function ContactBox(props) {
  const {
    _id = "",
    body = "",
    createdAt = "",
    email = "",
    name = "",
    // ui managing >>
    answerText = "پاسخ",
    removeText = "حذف",
    answerOption = true,
    // methods >>
    onAnswerClick = () => {},
    onRemoveClick = () => {},
  } = props;
  
  // button methods >>
  const answerButtonHandler = () => {
    try {
      // you can just get email value from this component by send a method
      // but if you want to have answer value you shoud use a modal out of this component !!
      onAnswerClick(email || "");
    } catch (err) {
      console.error(err);
    }
  };
  const removeButtonHandler = () => {
    try {
      // you can just get id value from this component by send a method and
      // (if user click on delete button onRemoveClick is run)
      onRemoveClick(_id ?? "");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div
        className="
        #custom_classes >>
        s_box_color 
        s_shadow 
        p_shadow_color 
        p_border 
         #tailwind_classes >>
        w-full 
        h-[250px] 
        p-3 
        flex 
        flex-col 
        gap-y-3 
        rounded-xl 
        relative
        group
        font-dana-md
      "
      >
        {/* Header box */}
        <div className="w-full p-3 max-h-[72px] bg-background-light dark:bg-background-dark shadow rounded-xl">
          <div className="flex items-center justify-between ">
            {/* Right side */}
            <div className="flex items-center gap-x-2">
              {/* Profile */}
              <div className="profile"></div>
              {/* name and email */}
              <div className="flex flex-col gap-y-1 text-text-dark dark:text-text-light">
                <span className="text-sm">{name}</span>
                <span className="text-xs">{email}</span>
              </div>
            </div>
            {/* Left side */}
            <div className="flex items-center gap-x-1">
              {/* Date */}
              <span className="text-text-dark/90 dark:text-text-light/90">
                {createdAt?.slice(0, 10)}
              </span>
              <MuiButton className="button-custom">
                <ArrowBackRoundedIcon />
              </MuiButton>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="b_box_color shadow w-full h-full rounded-xl p-3 ">
          {body}
        </div>
        {/* Absolute button */}
        {answerOption && (
          <div
            className="
        opacity-0 
        group-hover:!opacity-100 
        transition-all  
        absolute 
        bottom-5
        right-5
        flex
        justify-start
        items-center
        gap-3
        
        "F
          >
            <MuiButton onClick={answerButtonHandler} variant="contained">
              {answerText}
            </MuiButton>
            <MuiButton
              onClick={removeButtonHandler}
              variant="contained"
              color="error"
            >
              {removeText}
            </MuiButton>
          </div>
        )}
      </div>
    </>
  );
});
