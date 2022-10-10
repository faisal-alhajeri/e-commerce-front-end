import { faCheck, faCircleInfo, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Login from "../../pages/Login";
import { elementType, inputValidationTypes } from "../../types/types";
import "./forms.css";

type infoProps = React.ComponentProps<"div"> & {
  infoMessage?: string;
};

type inputProps = infoProps &
  React.ComponentProps<"input"> & {
    containerClassName?: string;
    validator?: (value: string) => inputValidationTypes;
  };

type inputWithLabelProps = inputProps & {
  label: string;
  inputName?: string;
  className?: string;
  inputClassName?: string;
  inputContainerClassName?: string;
};

export function InfoBox({ infoMessage, className, ...props }: infoProps) {
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
  infoMessage,
  style,
  ...props
}: inputProps) {
  const inputRef = useRef<HTMLInputElement>(null!);
  const [validState, setValidState] = useState<inputValidationTypes>(
    inputValidationTypes.NEUTRAL
  );

  const setValidation = (e: any) => {

    let value = e.target.value;
    let valid = validator!(value);
    setValidState(valid);


  };

  const handleChange = (e: any) => {
    if (validator) setValidation(e);
    if (onChange) onChange(e);
  };

  const showInfoMessege =
    validator && infoMessage && validState === inputValidationTypes.NOT_VALID;

  return (
    <>
      <div className={`${containerClassName}`}>
        <div
          className={`d-inline-flex align-items-center position-relative`}
          style={{ width: "inherit" }}
        >
          <input
            onChange={handleChange}
            ref={inputRef}
            className={`input rounded-4 shadow-sm ${className}`}
            {...props}
            style={{ width: "inherit" , ...style}}
          />
          <div
            className="position-absolute"
            style={{ right: "0%", transform: "translate(150%)" }}
          >
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
        </div>

        <InfoBox
          className={`${showInfoMessege ? "" : "d-none"}`}
          infoMessage={infoMessage}
        />
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
