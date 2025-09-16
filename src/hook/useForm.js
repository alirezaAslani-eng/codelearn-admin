import React, { useReducer, useState } from "react";

export default function useForm(initiallForm) {
  // form result of validation with reason
  const [formInputs, dispatch] = useReducer((states, action) => {
    switch (action.type) {
      case "CHANGE": {
        return {
          ...states,
          [action.itemName]: {
            value: action.value,
            isValid: action.isValid,
          },
        };
      }
      case "CLEAR-ALL": {
        return initiallForm;
      }
      default:
        return { ...states };
    }
  }, initiallForm);

  // clear all field
  const clearAllInput = () => {
    dispatch({
      type: "CLEAR-ALL",
    });
  };
  const isValidAllInput = () => {
    const phoneStatus = formInputs?.fullName?.isValid;
    const userNameStatus = formInputs?.userName?.isValid;
    const fullNameStatus = formInputs?.phone?.isValid;
    const emailStatus = formInputs?.email?.isValid;
    const passwordStatus = formInputs?.password?.isValid;

    // Get errors
    const errorList = [
      emailStatus,
      passwordStatus,
      userNameStatus,
      phoneStatus,
      fullNameStatus,
    ].filter((item) => item?.result === false);

    if (!errorList.length) return true;
    else {
      return errorList;
    }
  };
  return [formInputs, dispatch, clearAllInput, isValidAllInput];
}

// [action.itemName]: {
// value: action.value,
// isValid: action.isValid,
// },

// input-id
//{
// value: "..."
// isValid: validator(value);
// }
