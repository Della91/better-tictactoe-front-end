import React from "react";
import Input from "../components/Input";
import { useSendData } from "../hook/useSendData";

export default function ValidateInfo() {
  const { data, status, setStatus, updateValue, value } = useSendData();

  const handleNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateValue({ name: e.target.value });
  };

  const handleAgeOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAge = parseInt(e.target.value);
    let newDateOfBirth = undefined;
    if (!isNaN(newAge)) {
      const today = new Date();
      today.setFullYear(today.getFullYear() - newAge);
      newDateOfBirth = today.toISOString().split("T")[0]; // convert to a string and remove the time zone part
    }
    updateValue({ age: newAge, dateBirth: newDateOfBirth });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateValue({ married: e.target.checked });
  };

  const handleDateOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateOfBirth = e.target.value;
    let newAge = undefined;
    if (newDateOfBirth) {
      const birthDate = new Date(newDateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const birthMonth = birthDate.getMonth();
      const todayMonth = today.getMonth();
      if (
        todayMonth < birthMonth ||
        (todayMonth === birthMonth && today.getDate() < birthDate.getDate())
      ) {
        newAge = age - 1; // The age is not yet reached
      } else {
        newAge = age;
      }
    }
    updateValue({ age: newAge, dateBirth: newDateOfBirth });
  };

  const checkIsValidForm = () => {
    const { name, age, dateBirth } = value;
    return !(name && age && dateBirth);
  };

  if (status === "DATA_SENDED") {
    return (
      <div>
        {data?.success && <h1>DATI INVIATI VALIDI</h1>}
        {!data?.success && <h1>DATI INVIATI NON VALIDI</h1>}
        <button onClick={() => setStatus("INITIAL")}>RIPROVA</button>
      </div>
    );
  }

  return (
    <div>
      <form>
        <Input
          value={value.name}
          onChange={handleNameOnChange}
          inputType="text"
        />
        <Input
          value={value.age}
          onChange={handleAgeOnChange}
          inputType="number"
        />
        <Input
          disabled={!value.age || value.age < 18}
          checked={value.age && value.age < 18 ? false : value.married}
          onChange={handleCheckboxChange}
          inputType="checkbox"
        />
        <Input
          value={value.dateBirth}
          onChange={handleDateOnChange}
          inputType="date"
          max={new Date().toISOString().split("T")[0]}
        />
      </form>
      <button
        disabled={checkIsValidForm()}
        onClick={() => setStatus("SEND_DATA")}
      >
        INVIA DATI
      </button>
    </div>
  );
}
