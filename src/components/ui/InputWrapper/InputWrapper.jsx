import React from "react";

export default  function InputWrapper({
  inputComponenet,
  alertSection,
  className,
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      {inputComponenet}
      <span className="text-danger-light min-h-6 text-sm">{alertSection}</span>
    </div>
  );
}
