import React from "react";

export default function useCreateUser() {
  const createUser = (userInfo = {}) => {
    return fetch("https://alireza-eng.ir/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
  };
  return { createUser };
}
