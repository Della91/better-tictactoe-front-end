import { InputHTMLAttributes } from "react";

interface FormProps extends InputHTMLAttributes<HTMLInputElement> {
  inputType: "text" | "checkbox" | "number" | "date";
}

function Input({ inputType, ...props }: FormProps) {
  const renderInput = () => {
    switch (inputType) {
      case "text":
        return (
          <>
            <h1>INSERISCI IL NOME</h1>
            <input type="text" {...props} />
          </>
        );
      case "checkbox":
        return (
          <>
            <h1>SEI SPOSATO?</h1>
            <input type="checkbox" {...props} />
          </>
        );
      case "number":
        return (
          <>
            <h1>INSERISCI L'ETÀ</h1>
            <input type="number" {...props} />
          </>
        );
      case "date":
        return (
          <>
            <h1>INSERISCI DATA DI NASCITA</h1>
            <input type="date" {...props} />
          </>
        );
      default:
        return null;
    }
  };

  return <div>{renderInput()}</div>;
}

export default Input;
