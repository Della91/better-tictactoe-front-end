import { useEffect, useState } from "react";
import { BaseResponse } from "../interfaces";

interface DataProps {
  name?: string;
  age?: number;
  married?: boolean;
  dateBirth?: string;
}

export function useSendData() {
  const [status, setStatus] = useState<
    | "INITIAL"
    | "SEND_DATA"
    | "SENDING_DATA"
    | "DATA_SENDED"
    | "ERROR_SENDING_DATA"
  >("INITIAL");
  const [value, setValue] = useState<DataProps>({
    name: "",
    age: undefined,
    married: undefined,
    dateBirth: "",
  });
  const [data, setData] = useState<BaseResponse>();

  useEffect(() => {
    if (status === "SEND_DATA") {
      setStatus("SENDING_DATA");
      fetch("http://localhost:3001/info/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: value.name,
          age: value.age,
          married: value.married,
          dateBirth: value.dateBirth
            ? new Date(value.dateBirth).toISOString()
            : undefined,
        }),
      })
        .then((rawResponse) => {
          if ([200, 201].includes(rawResponse.status)) {
            return rawResponse.json();
          } else {
            throw new Error();
          }
        })
        .then((response: BaseResponse) => {
          setStatus("DATA_SENDED");
          setData(response);
        })
        .catch((e) => {
          setStatus("ERROR_SENDING_DATA");
        });
    }
  }, [status, value]);

  const resetStatus = () => {
    setStatus("INITIAL");
  };

  const updateValue = (newValue: Partial<DataProps>) => {
    setValue({ ...value, ...newValue });
  };

  return { status, value, data, updateValue, setStatus, resetStatus };
}
