import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { useFlashMesseges } from "./context/FlashMessegesContext";
import FlashMessage from "./FlashMessage";

export default function FlashMssagesContainer() {
  const { messeges, addMessege } = useFlashMesseges();

  return (
    <>
      {messeges.map((msgObj) => {
        return <FlashMessage msgObj={msgObj} />;
      })}
    </>

  );
}
