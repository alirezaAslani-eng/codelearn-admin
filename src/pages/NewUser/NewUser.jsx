import React from "react";
import { CreateUserForm } from "../../components/module";
const inputStyle = {
  fontFamily: "dana-md",
};

export default function NewUser() {
  return (
    <div>
      <div className="container">
        <CreateUserForm />
      </div>
    </div>
  );
}
// this page shoud refactor to use hook from <<
