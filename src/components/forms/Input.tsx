import { faCheck, faCircleInfo, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Login from "../../pages/Login";
import { elementType, inputValidationTypes } from "../../types/types";
import "./forms.css";

type infoProps = React.ComponentProps<'div'> & {
  infoMessage?: string
}

type inputProps = React.ComponentProps<"input"> & {
  containerClassName?: string;
  validator?: (value: string) => inputValidationTypes;
  invalidMessage?: string;
};

type inputWithLabelProps = inputProps & {
  label: string;
  inputName?: string;
  className?: string;
  inputClassName?: string;
  inputContainerClassName?: string;
};

export function InfoBox({infoMessage, className,...props} : infoProps) {
  return (
    <>
      <div className={`bg-light rounded-4 p-2 my-1 ${className}`}>
        <FontAwesomeIcon icon={faCircleInfo} color={"grey"} />{" "}
        {infoMessage ?? "invalid input"}
      </div>
    </>
  );
}

export function Input({
  className,
  validator,
  containerClassName,
  onChange,
  invalidMessage,
  ...props
}: inputProps) {
  const NOT_VALID_INPUT_CLASS = "input-not-valid";
  const VALID_INPUT_CLASS = "input-valid";
  const inputRef = useRef<HTMLInputElement>(null!);
  const inputSpanRef = useRef<HTMLSpanElement>(null!);

  const [validState, setValidState] = useState<inputValidationTypes>(
    inputValidationTypes.NEUTRAL
  );

  const setValidation = (e: any) => {
    console.log("run set validation");

    let value = e.target.value;
    let valid = validator!(value);
    setValidState(valid);

    // if (valid === inputValidationTypes.VALID) {
    //   inputSpanRef.current.classList.remove(NOT_VALID_INPUT_CLASS);
    //   inputSpanRef.current.classList.add(VALID_INPUT_CLASS);
    // } else if (valid === inputValidationTypes.NOT_VALID) {
    //   inputSpanRef.current.classList.add(NOT_VALID_INPUT_CLASS);
    //   inputSpanRef.current.classList.remove(VALID_INPUT_CLASS);
    // } else {
    //   inputSpanRef.current.classList.remove(NOT_VALID_INPUT_CLASS);
    //   inputSpanRef.current.classList.remove(VALID_INPUT_CLASS);
    // }
  };

  const handleChange = (e: any) => {
    if (validator) setValidation(e);
    if (onChange) onChange(e);
  };

  const showInfoMessege = validator && invalidMessage && validState === inputValidationTypes.NOT_VALID

  return (
    <>
      <div className={` ${containerClassName}`}>
        <div className={`d-inline-flex align-items-center w-100`}>
          <input
            onChange={handleChange}
            ref={inputRef}
            className={`input flex-grow-1 rounded-4 ${className}`}
            {...props}
          />

          {validState === inputValidationTypes.VALID ? (
            <FontAwesomeIcon icon={faCheck} color={"green"} />
          ) : (
            ""
          )}
          {validState === inputValidationTypes.NOT_VALID ? (
            <FontAwesomeIcon icon={faX} color={"red"} />
          ) : (
            ""
          )}
        </div>

        <InfoBox className={`${showInfoMessege? '' : 'd-none'}`} infoMessage={invalidMessage} />
      </div>
    </>
  );
}

export function InputWithLabel({
  label,
  inputName,
  className,
  inputClassName,
  inputContainerClassName,
  ...props
}: inputWithLabelProps) {
  const id = useId();

  return (
    <>
      <div className={`${className}`}>
        <div>
          <label htmlFor={id}>
            {label}
            {props.required ? "*" : ""}
          </label>
        </div>
        <Input
          name={inputName ? inputName : label}
          id={id}
          type="text"
          className={inputClassName}
          containerClassName={inputContainerClassName}
          {...props}
        />
      </div>
    </>
  );
}
