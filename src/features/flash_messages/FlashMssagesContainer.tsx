import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { useFlashMesseges } from "./context/FlashMessegesContext";
import FlashMessage from "./FlashMessage";

export default function FlashMssagesContainer() {
  const { messeges, addMessege } = useFlashMesseges();

  return (
    <>
      <div className="w-100">
        {messeges.map((msgObj) => {
          return <FlashMessage key={msgObj.id} msgObj={msgObj} />;
        })}
      </div>
    </>
  );
}
