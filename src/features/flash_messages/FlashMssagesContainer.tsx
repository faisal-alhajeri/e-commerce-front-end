import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { useFlashMesseges } from "./context/FlashMessegesContext";
import FlashMessage from "./FlashMessage";

export default function FlashMssagesContainer() {
  const { messeges, addMessege } = useFlashMesseges();

  return (
    <>
      <div className="position-absolute w-100">
        {messeges.map((msgObj) => {
          return <FlashMessage msgObj={msgObj} />;
        })}
      </div>
    </>
  );
}
